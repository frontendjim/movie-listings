import { movieReducer as reducer, GET_MOVIES, GET_MOVIES_SUCCEEDED } from './';
import sampleMovies from './data';

test('test initial state', () => {
    const action = {};
    const newState = { list: [], error: null };

    expect(reducer(undefined, action)).toEqual(newState);
});

test('test GET_MOVIES resets error to null', () => {
    const action = { type: GET_MOVIES };
    const prevState = { list: [], error: 'Some error stack' };
    const newState = { list: [], error: null };

    expect(reducer(prevState, action)).toEqual(newState);
});

test('test GET_MOVIES_SUCCEEDED populates state correctly', () => {
    const action = { type: GET_MOVIES_SUCCEEDED, movies: sampleMovies };
    const prevState = { list: [], error: null };
    const newState = { list: sampleMovies, error: null };

    expect(reducer(prevState, action)).toEqual(newState);
})