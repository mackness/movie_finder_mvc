import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Model from '../scripts/model';

const mockAxiosInstance = new MockAdapter(axios);
const model = new Model(mockAxiosInstance);

describe('Model', () => {
    describe('Movie Search Request', () => {
        const mockSearchResponse = require('./mock-search-response');
        const params = {
            apikey: process.env.API_TOKEN,
            s: 'batman'
        };

        it('should respond with results for a search term', () => {
            mockAxiosInstance.onGet('http://www.omdbapi.com', params).replyOnce(200, mockSearchResponse);
            model.search('batman')
                .then((response) => {
                    assert.equal(response.status, 200);
                    assert.deepEqual(response.data, mockSearchResponse);
                });
        });

        it('should populate currentMovieList field with search results', () => {
            assert.equal(model.currentMovieList.length, 10);
        });

        it('should catch if response status code is not in 200 - 206 range', () => {
            mockAxiosInstance.onGet('http://www.omdbapi.com', params).replyOnce(() => {
                return [
                    500,
                    { error: 'Internal Server Error: 500' }
                ]
            })
            model.search('batman')
                .catch((error) => {
                    assert.equal(error.response.status, 500);
                });
        });
    });

    describe('Movie Detail Request', () => {
        const mockDetailResponse = require('./mock-detail-response');
        const imdbID = 'tt0372784';
        const params = {
            params: {
                apikey: process.env.API_TOKEN,
                i: encodeURIComponent(imdbID)
            }
        };

        it('should respond with movie detail results based on a movie id', () => {
            mockAxiosInstance.onGet('http://www.omdbapi.com', params).replyOnce(200, mockDetailResponse);
            model.loadMovieDetails(imdbID)
                .then((response) => {
                    assert.equal(response.status, 200);
                    assert.deepEqual(response.data, mockDetailResponse);
                })
        });

        it('should add movie detail response to cache map by movie id', () => {
            assert.deepEqual(model.movieDetailsCache[imdbID].data, mockDetailResponse);
        });

        it('should purge movie details cache map', () => {
            model.purgeMovieDetailsCache();
            assert.equal(Object.keys(model.movieDetailsCache).length, 0);
        });

        it('should throw if response status is not in 200 - 206 range', () => {
            mockAxiosInstance.onGet('http://www.omdbapi.com', params).replyOnce((config) => {
                return [
                    500,
                    { error: 'Internal Server Error: 500' }
                ];
            });
            model.loadMovieDetails(imdbID)
                .catch((error) => {
                    assert.equal(error.response.status, 500);
                });
        });

        it('should pass thought to the real imdb api and get a 401 response', (done) => {
            mockAxiosInstance.onGet('http://www.omdbapi.com', params).passThrough();
            model.loadMovieDetails(imdbID).catch((error) => {
                assert.equal(error.response.status, 401);
                done();
            })
        })
    });
});
