import React from 'react';

import './genreFilter.css';

const GenreFilters = ({ genres, clickGenre }) => {
    if(!genres) return;

    return (
        <div>
            <h2><i className="fas fa-theater-masks"></i> Show films by genre</h2>
            { genres && genres.map(genre => 
                <div 
                    className="genre-toggle" 
                    key={genre.id}>
                    <input 
                        className="genre-toggle__input"
                        type="checkbox"
                        id={`genre${genre.id}`}
                        onChange={() => clickGenre(genre.id)}
                    />
                    <label
                        className="genre-toggle__label"
                        htmlFor={`genre${genre.id}`}>
                        {genre.name}
                    </label>
                </div>
            )}
        </div>
    );
};

export default GenreFilters;