/**
 * @typedef {!{Title: string, Year: string, imdbID: string, Type: string, Poster: string}}
 */
export var Movie;

/**
 * @typedef {!Array<Movie>}
 */
export var MovieList;

/**
 * @typedef {!{Title: string, Year: string, Rated: string, Released: string, Runtime: string, Genre: string, Director: string, Writer: string, Actors, string, Plot: string, Language: string, Country: string, Awards, string, Awards: string, Poster: string, Ratings: Array<string>, Metascore: string, imdbRating: string, imdbVotes: string, imdbID: string, Type: string, DVD: string, BoxOffice: string, Production: string, Website: string, Response: boolean}}
 */
export var MovieDetails;

/**
 * @typedef {!{config: object, data: object, header: object, request: object, status: number, statusText: string}}
 */
export var ApiResponse;