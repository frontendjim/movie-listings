import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects'

import { movieReducer, getMoviesSaga, filterMoviesByGenreSaga } from './movies';
import { genreReducer } from './genres';

export const rootReducer = combineReducers({
    movies: movieReducer,
    genres: genreReducer
});

export function* rootSaga() {
    yield all([
        getMoviesSaga(),
        filterMoviesByGenreSaga()
    ])
}