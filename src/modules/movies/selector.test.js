import { selectMovies } from './';
import sampleMovies from './data';

test('test selectMovies selector returns correct slice of state', () => {
    const state = {
        movies: {
            list: sampleMovies,
            error: null
        },
        genres: {
            list: []
        }
    }

    expect(selectMovies(state)).toEqual(sampleMovies);
});