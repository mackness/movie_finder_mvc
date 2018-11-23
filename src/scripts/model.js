import axios from 'axios';
import { ApiResponse } from './types';

export default class Model {

    constructor() {
        this.currentMovieList = [];
    }

    /**
     * @param  {ApiResponse} response search API response
     * @return  {ApiResponse} search API response
     * @description Validate the API response by making sure it's in a successful range
     * according to RFC 7231 (https://goo.gl/GA9Ncp)
     */
    validateApiResponse(response) {
        if (response.data.status >= 200 && response.data.status <= 206) {
            alert('We\'re having trouble connecting to the API, please try again later');
        }
        return response;
    }

    /**
     * @param  {string} term movie search term
     * @return  {ApiResponse} search API response
     * @description Search for a movie with a URI encoded serch term
     */
    search = (term) => {
        return axios
                .get(`http://www.omdbapi.com/?apikey=${process.env.API_TOKEN}&s=${encodeURIComponent(term)}`)
                .then((response) => {
                    this.currentMovieList = response.data.Search
                    return response;
                })
                .then((response) => this.validateApiResponse(response));
    }
}
