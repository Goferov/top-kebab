import React from 'react';

function StarRating({ rating = 0 }) {
    const maxStars = 5;

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                return starValue <= rating ? (
                    <i key={index} className="fa-solid fa-star text-yellow-300"></i>
                ) : (
                    <i key={index} className="fa-regular fa-star text-yellow-300"></i>
                );
            })}
        </div>
    );
}

export default StarRating;
