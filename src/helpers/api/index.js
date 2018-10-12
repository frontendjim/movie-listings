import axios from 'axios';

// set up default api config
var api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'b00f43af86e10caf614a98c71b950354'
    }
});

// request movies
export function apiGetMovies() {
    return api.get('/movie/now_playing')
        .then(response => response.data.results);
}

// request genres
export function apiGetGenres() {
    return api.get('/genre/movie/list')
        .then(response => response.data.genres);
}