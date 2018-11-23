
import { MovieList } from './types';
import { on, qsa, qs, getSearchParam } from './utilities';
import throttle from 'lodash.throttle';

export default class View {
    constructor(template) {
        this.template = template;

        this.elements = {
            input: qs('#search-input'),
            grid: qs('#grid')
        };
    }

    /**
     * @param {function}
     * @description bind a throttled onchange handler for the main search input
     */
    bindOnInput(handler) {
        on(this.elements.input, 'input', throttle((event) => handler(event), 300));
    }

    /**
     * @param {function}
     * @description event delegated mouseover for grid items
     */
    bindMovieMouseOver = (handler) => {
        on(this.elements.grid, 'mouseover', (event) => {
            if (event.target.classList.contains('hover-target')) {
                handler(
                    event.target, // html element target
                    event.target.dataset.index // index of target
                );
            }
        });
    }

    /**
     * @param {function}
     * @description event delegated mouseout for grid items
     */
    bindMovieMouseExit = (handler) => {
        on(this.elements.grid, 'mouseout', (event) => {
            if (event.target.classList.contains('hover-target')) {
                handler();
            }
        });
    }

    /**
     * @param {function}
     * @description event delegated click for grid item button
     */
    bindMovieDetailButtonClick = (handler) => {
        on(this.elements.grid, 'click', (event) => {
            if (event.target.classList.contains('grid-item-button')) {
                handler(
                    event.target, // html element target
                    event.target.dataset.index // index of target
                );
            }
        });
    }

    /**
     * @param {MovieList} movies a response from the OMDb api containing movie(s)
     */
    renderMovies = (movies) => {
        if (movies && movies.length > 0) {
            this.elements.grid.innerHTML = this.template.movieList(movies)
        } else {
            this.elements.grid.innerHTML = this.template.noResultsView(this.elements.input.value || getSearchParam('search'))
        }
    }

    /**
     * @param {object} details a response from the OMDb api containing movie details
     * @param {!{x: number, y: number}} style style object containing x, y coords
     * for the movie details panel
     */
    renderMovieDetailPanel = (details, style) => {
        const $details = qsa('.movie-details');
        if ($details && $details.length === 0) {
            this.elements.grid.insertAdjacentHTML('beforeend', this.template.movieDetailsPanel(details, style));
        } else {
            this.elements.grid.removeChild(qs('.movie-details'));
            this.elements.grid.insertAdjacentHTML('beforeend', this.template.movieDetailsPanel(details, style));
        }
    }

    /**
     * @description remove the movie details panel from the document
     */
    removeMovieDetailsPanel = () => {
        const $details = qsa('.movie-details');
        if ($details && $details.length) {
            this.elements.grid.removeChild(qs('.movie-details'));
        }
    }
}
