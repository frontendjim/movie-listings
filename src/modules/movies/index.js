import { take, put, call, select } from 'redux-saga/effects';
import { orderBy } from 'lodash/collection';

import { apiGetMovies, apiGetGenres } from '../../helpers/api';

import { getGenresSucceeded } from '../genres';

// CONSTANTS
export const DEFAULT_RATING = 3;

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCEEDED = 'GET_MOVIES_SUCCEEDED';
export const GET_MOVIES_FAILED = 'GET_MOVIES_FAILED';

export const FILTER_MOVIES = 'FILTER_MOVIES';
export const FILTER_MOVIES_SUCCEEDED = 'FILTER_MOVIES_SUCCEEDED';

// ACTIONS
export const getMovies = () => ({ type: GET_MOVIES });
export const getMoviesSucceeded = movies => ({ type: GET_MOVIES_SUCCEEDED, movies });
export const getMoviesFailed = error => ({ type: GET_MOVIES_FAILED, error });

export const filterMovies = filters => ({ type: FILTER_MOVIES, filters });
export const filterMoviesSucceeded = movies => ({ type: FILTER_MOVIES_SUCCEEDED, movies });

// INITIAL STATE
const initialState = {
    list: [],
    error: null
};

// REDUCER
export const movieReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case GET_MOVIES:
            return { ...state, error: null };

        case GET_MOVIES_SUCCEEDED:
            return { ...state, list: payload.movies, error: null };

        case GET_MOVIES_FAILED:
            return { ...state, list: [], error: payload.error };
        
        case FILTER_MOVIES_SUCCEEDED:
            return { ...state, list: [...payload.movies] };

        default:
            return state;
    }
};

// SAGAS

// handle get movies action call
export function* getMoviesSaga() {
    while(true) {
        yield take(GET_MOVIES);

        try {
            const movies = yield call(apiGetMovies);
            const genres = yield call(apiGetGenres);
            
            yield put(getMoviesSucceeded(formatMovies(movies, genres)));
            yield put(getGenresSucceeded(filterGenres(movies, genres)));

        } catch(e) {
            yield put(getMoviesFailed(e)); // needs more error handling
        }
    }
}

// handle filter action call
export function* filterMoviesByGenreSaga() {
    while(true) {
        const filters = yield take(FILTER_MOVIES);
        const movies = yield select(selectMovies);

        yield put(filterMoviesSucceeded(filterResults(movies, filters.filters)));
    }
}

// SELECTORS
export const selectMovies = state => state.movies.list;

// take raw movie results and decorate the data with genres and visibility flag
// filter by default rating of 3
// then order by popularity
// we do this just once on initial api response
function formatMovies(movies, genres) {
    const moviesWithGenres = movies.map(movie => {
        const genreList = genres.filter(genre => movie.genre_ids.includes(genre.id));

        return { 
            ...movie, 
            genres: genreList, 
            visible: movie.vote_average >= DEFAULT_RATING 
        }
    });

    return orderBy(moviesWithGenres, 'popularity', 'desc');
}

// filter movie results in store
// works by setting a 'visible` flag so we don't lose data
function filterResults(movies, filters) {
    const { genres, rating } = filters;

    return movies.map(movie => {
        let flag = true;

        // filter genres first
        genres.forEach(genreId => {
            if(!movie.genre_ids.includes(genreId)) {
                flag = false;
            }
        });

        // filter rating second
        if(movie.vote_average < rating) {
            flag = false;
        }

        return { ...movie, visible: flag };
    });
}

function filterGenres(movies, genres) {
    return genres.filter(genre => {
        let flag = false;

        movies.forEach(movie => {
            if(movie.genre_ids.includes(genre.id)) {
                flag = true;
            }
        });

        return flag;
        
    });
}