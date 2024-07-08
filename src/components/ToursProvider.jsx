import React, { createContext, useState } from 'react';

export const TourContext = createContext();

export function ToursProvider({ children }) {
    const [guests, setGuests] = useState({
        adult: 2,
        child: 1,
        senior: 0,
        infant: 1,
    });
    const [loading, setLoading] = useState(false);
    const [tours, setTours] = useState({});

    return (
        <TourContext.Provider value={{ 
            guests, setGuests, 
            loading, setLoading, 
            tours, setTours 
        }}>
            {children}
        </TourContext.Provider>
    );
}

