import React from 'react';
import PropTypes from 'prop-types';

export default function Skeleton({ className }) {
    return <div className={`bg-gray-300 animate-pulse ${className}`}></div>;
}

Skeleton.propTypes = {
    className: PropTypes.string.isRequired,
};
