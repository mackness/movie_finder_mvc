import { ApiResponse } from './types';
import { qs, getSearchParam } from './utilities';

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.MEDIUM_BREAKPOINT_WIDTH = 980;
        this.DETAILS_CARD_WIDTH = 225;

        view.bindOnInput(this.onSearchInput.bind(this));
        view.bindMovieDetailButtonClick(this.displayMovieDetailPanel.bind(this));
        view.bindMovieMouseOver(this.displayMovieDetailPanel.bind(this));
        view.bindMovieMouseExit(this.onMovieMouseExit.bind(this));
    }

    /**
     * @param  {ApiResponse} response api response object
     * @description should take the api response and pass it to the
     * view for rendering.
     */
    processApiResponse = (response) => {
        this.model.purgeMovieDetailsCache();
        this.view.renderMovies(response.data.Search);
    }

    /**
     * @description setupView runs when the view loads for the first time and checks
     * if the search query param exists, If it does execute a movie search with
     * the valud of the search param.
     */
    setupView = () => {
        const term = getSearchParam('search');
        if (term) {
            this.model.search(term)
                .then((response) => this.processApiResponse(response));
        }
    }

    /**
     * @param  {Object} event onchange event object
     * @description dispatch a serch request when the search input 
     * value changes
     */
    onSearchInput(event) {
        const term = event.target.value;
        if (term) {
            this.model.search(term)
                .then((response) => this.processApiResponse(response));
        }
    }

    /**
     * @param  {!{x: number, y: number}} response api response object
     * @description 
     * This method take the X, Y offset of the event target and users it to determine 
     * the position of the movie details panel.
     */
    calculateMovieDetailPosition = (coords) => {
        const { clientWidth } = qs('.hover-target');
        if (window.innerWidth <= this.MEDIUM_BREAKPOINT_WIDTH) {
            return {
                top: coords.y,
                left: 10
            }
        } else {
            return {
                top: coords.y,
                left: (coords.x >= clientWidth * 3) ? clientWidth * 3 - (this.DETAILS_CARD_WIDTH / 1.5): coords.x + clientWidth
            }
        }
    }

    /**
     * @param  {HTMLElement} target event target HTMLElement
     * @param  {number} _index index of movie grid item
     * @description This method takes the target HTMLElement from one of the events in the view as 
     * well as the index of the grid item and handles rendering the movie  details panel. Note that
     * the model has a movie details cache so a request will  not be made if cached movie details
     * data exists.
     */
    displayMovieDetailPanel = (target, _index) => {
        const index = parseInt(_index, 10);
        const id = this.model.currentMovieList.length && this.model.currentMovieList[index].imdbID;
        const position = this.calculateMovieDetailPosition({x: target.offsetParent.offsetLeft, y: target.offsetParent.offsetTop});

        this.view.renderMovieDetailPanel(null, position);

        if (id) {
            this.model.loadMovieDetails(id)
                .then((response) => response.data)
                .then((response) => this.view.renderMovieDetailPanel(response, position))
                .catch(() => alert('There was an error loading movie details'));
        }
    }

    /**
     * @description remove details panel from document.
     */
    onMovieMouseExit = () => {
        this.view.removeMovieDetailsPanel();
    }
}
