import React, { Component } from 'react';

import './ratingFilter.css';

class RatingFilter extends Component {
    
    state = {
        current: 3
    };

    handleChange = ev => {
        const { value } = ev.target;

        this.setState({ current: value });
        this.props.changeRating(value);
    }

    render() {
        const { current } = this.state;

        return (
            <div>
                <h2><i className="far fa-star"></i> Show films by rating</h2>
                <label
                    htmlFor="rating" 
                    className="rating-filter__label">
                    Minimum rating
                </label>

                <div className="rating-filter__input">
                    <span className="rating-filter__unit">0</span>
                    <input 
                        type="range" 
                        id="rating" 
                        name="rating"
                        min="0"
                        max="10"
                        defaultValue={3}
                        onChange={this.handleChange}
                    />
                    <span className="rating-filter__unit">10</span>
                    <div className="rating-filter__current">{current}</div>
                </div>
            </div>
        );
    }
}

export default RatingFilter;