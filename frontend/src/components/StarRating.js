import React from 'react';

const StarRating = ({ rating }) => {
    const stars = Array(5)
        .fill(0)
        .map((_, index) => (
            <i
                key={index}
                className={`fa-solid fa-star ${index < rating ? 'text-yellow-300' : 'text-gray-300'}`}
            ></i>
        ));

    return <div className="flex">{stars}</div>;
};

export default StarRating;
