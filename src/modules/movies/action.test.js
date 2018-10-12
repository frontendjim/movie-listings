import { 
    getMovies, getMoviesSucceeded, getMoviesFailed,
    GET_MOVIES, GET_MOVIES_SUCCEEDED, GET_MOVIES_FAILED
} from './';
import sampleMovies from './data';

test('getMovies', () => {
    expect(getMovies()).toEqual({ type: GET_MOVIES });
});

test('getMoviesSucceeded', () => {
    expect(getMoviesSucceeded(sampleMovies)).toEqual({ type: GET_MOVIES_SUCCEEDED, movies: sampleMovies });
});

test('getMoviesFailed', () => {
    expect(getMoviesFailed('Error stack')).toEqual({ type: GET_MOVIES_FAILED, error: 'Error stack' });
});