import { qs, getSearchParam } from './utilities';

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.bindOnInput(this.onSearchInput.bind(this));
    }

    /**
     * @param  {ApiResponse} response api response object
     * @description should take the api response and pass it to the 
     * view for rendering
     */
    processApiResponse = (response) => {
        this.view.renderMovies(response.data.Search);
    }

    /**
     * @description setupView runs when the view loads for the first time and checks
     * if the search query param exists, If it does execute a movie search.
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

}
