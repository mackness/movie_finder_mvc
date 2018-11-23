import { truncateText } from './utilities';
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

    movieDetailsPanel(details, style) {
        return `
            <div class="movie-details ${details ? '' : 'movie-details--loading'}" style="left: ${style.left}px; top: ${style.top}px">
                ${details ? (`
                    <h3 class="movie-details-title">${details.Title}</h3>
                    <p class="movie-details-text">${details.Year}</p>
                    <p class="movie-details-text">${details.Director}</p>
                    <p class="movie-details-text">${truncateText(details.Writer, 150)}</p>
                    <div class="movie-details-block">
                        ${details.Ratings.reduce((template, rating) => {
                            return template + `
                                <div class="movie-details-rating">
                                    <span class="movie-details-rating-source">${rating.Source}:</span>
                                    <span class="movie-details-rating-value">${rating.Value}</span>
                                </div>
                            `;
                        }, '')}
                    </div>
                `) : (`
                    <span>loading...</span>
                `)}
            </div>
        `;
    }

    noResultsView(searchTerm) {
        return `
            <div class="no-results-view">
                <h2>No results for: ${searchTerm}</h2>
            </div>
        `
    }
}
