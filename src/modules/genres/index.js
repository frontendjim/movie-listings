// CONSTANTS
export const GET_GENRES_SUCCEEDED = 'GET_GENRES_SUCCEEDED';
export const GET_GENRES_FAILED = 'GET_GENRES_FAILED';

// ACTIONS
export const getGenresSucceeded = genres => ({ type: GET_GENRES_SUCCEEDED, genres });
export const getGenresFailed = error => ({ type: GET_GENRES_FAILED, error });

// INITIAL STATE
const initialState = {
    list: [],
    error: null
};

// REDUCER
export const genreReducer = (state = initialState, payload) => {
    switch(payload.type) {
        
        case GET_GENRES_SUCCEEDED:
            return { ...state, list: payload.genres, error: null };
        
        case GET_GENRES_FAILED:
            return { ...state, list: [], error: payload.error };

        default: 
            return state;
    }
}

export const selectGenres = state => state.genres.list;