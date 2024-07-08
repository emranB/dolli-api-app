import React, { useContext } from 'react';
import { TourContext } from '../components/ToursProvider';

function LoadingScreen() {
    const { loading } = useContext(TourContext);

    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <div className='loading-icon'></div>
            <p className="loading-text">Please wait. . . </p>
        </div>
    );
}

export default LoadingScreen;

