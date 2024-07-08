import React, { useContext } from 'react';
import { TourContext } from './ToursProvider';
import { ToastManager } from '../utils/ToastManager'; 
import Counter from '../utils/Counter';


function ToursSearch() {
    const { guests, setGuests, setLoading, setTours } = useContext(TourContext);

    /*
        fetchTours() async
        - Fetches data from remote API server
        - Forwards fetched data, for parsing
    */
    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://candidate-application.dolli.cloud/api/tour-avail', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setAvailableTours(data);
            ToastManager.success(`Tours fetched successfully!`);
        } catch (error) {
            console.error('Failed to fetch tours', error);
            ToastManager.error(`Failed to fetch tours. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    /*
        setAvailableTours(toursData)
        - Accepts Obect `toursData`:
            - {
                'tours': [],
                'currency': {}
            }
        - Parse through tickets list for each tour and find tours that can accomodate
            count of guests of each type. Each ticket represents a seat.
        - totalPax: Total Number of Guests represents the total number of tickets required.
        - totalPax must be less than the maxPax allowed for each tour
        - Guest types: adult, child, senior, infant
        - The number of each type of guest tickets must also be available for the tour.
        - Adds total price
            - This function is also responsible for calculting the total price for each ticket
    */
    const setAvailableTours = (toursData) => {
        var availableTours = {
            'tours': [],
            'currency': toursData.currency
        };

        var totalPax = Object.values(guests).reduce((acc, num) => acc + num, 0);
        for (let tour of toursData.tours) {
            /* If total numbers of guests surpasses total seats allowed, 
            tour cannot accomodate guests */
            let totalPaxIsWithinLimits = (tour.minPax <= totalPax && totalPax <= tour.maxPax);
            let totalPaxCanBeAccomodated = (totalPax <= tour.seats);
            let totalPaxOk = totalPaxIsWithinLimits && totalPaxCanBeAccomodated;
            if (!totalPaxOk) 
                continue;

            let tourOk = true;
            for (const [guestType, guestCount] of Object.entries(guests)) {
                if (!guestCount) 
                    continue;
                
                let ticketWanted = tour['tickets'].find(ticket => 
                    ticket['name'].toLowerCase() == guestType.toLowerCase()
                );

                if (ticketWanted === undefined) {
                    tourOk = false;
                    break;
                }

                if (tour['totalPrice'] === undefined) 
                    tour['totalPrice'] = 0.0
                tour['totalPrice'] += guestCount * ticketWanted['price'];
            }

            if (tourOk)
                availableTours['tours'].push(tour);
        }
        
        setTours(availableTours);
    }

    return (
        <div className='tours-search-container'>
            <h1>Filters</h1>
            <div className='grid'>
                {Object.entries(guests).map(([key, count]) => (
                    <Counter
                        key={key}
                        label={key}
                        value={count}
                        onChange={(newVal) => setGuests({ ...guests, [key]: newVal })}
                    />
                ))}
            </div>
            <button onClick={fetchTours}>Search</button>
        </div>
    );
}

export default ToursSearch;
