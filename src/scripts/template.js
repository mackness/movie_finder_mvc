export default class Template {

    movieList(movies) {
        return movies.reduce((template, movie, i) => {
            return template + `
                <div class="grid-item" tabindex="${i}" data-id=${movie.imdbID}>
                    <div class="grid-item-inner">
                        <div class="hover-target" data-index="${i}"></div>
                        ${movie.Poster === 'N/A' ? (
                            `<figure class="grid-item-image grid-item-image--none"></figure>`
                        ) : (
                            `<figure class="grid-item-image" style="background-image: url(${movie.Poster})"></figure>`
                        )}
                        <div class="grid-item-meta">
                            <h2 class="grid-item-meta-title" title="${movie.Title}">${movie.Title}</h2>
                            <p class="grid-item-meta-type" title="${movie.Type}">${movie.Type}</p>
                        </div>
                        <button class="grid-item-button" data-index="${i}">details</button>
                    </div>
                </div>
            `;
        }, '');
    }

}
