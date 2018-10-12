import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMovies, filterMovies, selectMovies, DEFAULT_RATING } from '../../modules/movies';
import { selectGenres } from '../../modules/genres';

import MovieCard from '../movieCard';
import GenreFilters from '../genreFilter';
import RatingFilter from '../ratingFilter';

import './movieList.css';

class MovieList extends Component {

    state = {
        selectedGenres: [],
        selectedRating: DEFAULT_RATING
    }

    componentDidMount = () => 
        this.props.fetchMovies();

    // this is the filter movies action, passing through the two filters
    filterMovies = () => {
        const { selectedGenres, selectedRating } = this.state;

        this.props.filterMovies({ 
            genres: selectedGenres, 
            rating: selectedRating
        });
    }

    // method to return movies visible on the screen
    returnMovieCount = () => 
        this.props.movies.reduce((count, movie) => movie.visible ? count + 1 : count, 0);

    returnMovieTotalLabel = () => {
        const movieCount = this.returnMovieCount();

        if(movieCount < 1) return 'No movies to show';

        return `Showing ${movieCount} movie${movieCount !== 1 ? 's' : ''}`;
    }

    // if someone changes rating, update state and call filter movies action
    handleRatingChange = value => 
        this.setState({ selectedRating: parseInt(value) }, this.filterMovies);

    // if someone selects a genre filter, update state and call filter movies action
    handleFilterClick = genreId => {
        const { selectedGenres } = this.state;
        const newSelectedGenres = selectedGenres.includes(genreId) ? 
            selectedGenres.filter(genre => genre !== genreId) : [ ...selectedGenres, genreId ]

        this.setState({ selectedGenres: newSelectedGenres }, this.filterMovies );
    }

    render() {
        const { movies, genres } = this.props;
        const { selectedRating } = this.state;

        return (
            <div>
                <div className="movies-filters">
                    <div className="movies-filters__genres">
                        <GenreFilters 
                            currentValue={selectedRating} 
                            genres={genres} 
                            clickGenre={this.handleFilterClick} />
                    </div>
                    <div className="movies-filters__rating">
                        <RatingFilter changeRating={this.handleRatingChange} />
                    </div>
                </div>
                
                <h3 className="movies-totel-text">{this.returnMovieTotalLabel()}</h3>
                <div className="movies">
                    { movies && movies.map(movie => <MovieCard key={movie.id} {...movie} /> )}
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: () => dispatch(getMovies()),
    filterMovies: filters => dispatch(filterMovies(filters))
});

const mapStateToProps = state => ({
    movies: selectMovies(state),
    genres: selectGenres(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);