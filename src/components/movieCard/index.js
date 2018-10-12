import React from 'react';

import './movieCard.css';

const MovieCard = ({ title, poster_path, popularity, vote_average, genres, visible }) => {

    // don't render the film if it's set to not show
    if(!visible) return null;

    const renderGenres = genres => genres.map(({name, id}) => 
        <small key={id} className="movie-card__tag">{name}</small>
    );

    return (
        <div className="movie-card">
            <div className="movie-card__img">
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            </div>
            <div className="movie-card__info">
                <span className="movie-card__popularity" title="Popularity">Pop. {popularity}</span>
                <h2 className="movie-card__title">{title}</h2>

                { renderGenres(genres) }
                
                <div className="movie-card__rating" title={`${vote_average} out of 10 stars`}><i className="fas fa-star"></i> {vote_average}</div>
            </div>
        </div>
    );
}

export default MovieCard;