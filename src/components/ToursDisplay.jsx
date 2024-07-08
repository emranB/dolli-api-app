import React, { useState, useContext, useMemo } from 'react';
import { TourContext } from './ToursProvider';
import { Container, Grid, Switch, FormControlLabel, Box } from '@mui/material';
import TourCard from '../utils/TourCard';
import { ToastManager } from '../utils/ToastManager'; 


function ToursDisplay() {
    const { tours, guests, setLoading } = useContext(TourContext);
    const [sortOrder, setSortOrder] = useState('asc');  // 'asc' for ascending, 'desc' for descending

    /*
        sortedTours()
        -  Sort tours by price
        - ASC or DESC
    */
    const sortedTours = useMemo(() => {
        if (!Object.keys(tours).length)
            return {}

        const toursCopy = structuredClone(tours)  // Assuming tours.tours is the array
        return toursCopy['tours'].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.totalPrice - b.totalPrice;
            } else {
                return b.totalPrice - a.totalPrice;
            }
        });
    }, [tours, sortOrder]);

    /*
        handleToggleSort(event)
        - Toggles sort state of tours
    */
    const handleToggleSort = (event) => {
        setSortOrder(event.target.checked ? 'desc' : 'asc');
    };

    /*
        parseDataForBooking()
        - Make remote POST API call for booking tour
    */
    const bookTour = async(tourData) => {
        setLoading(true);
        try {
            var body = parseBookingData(tourData);
            const response = await fetch('https://candidate-application.dolli.cloud/api/tour-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)  
            });
            const data = await response.json();
            if (response.ok) {
                ToastManager.success(`Tour booked successfully!`);
                ToastManager.success(`Details: ${JSON.stringify(data)}`);
            } else {
                ToastManager.error(`Failed to book tour. ${data.message}`);
            }
        } catch (error) {
            ToastManager.error(`Error occurred while booking tour. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    /*
        parseDataForBooking()
        - Parses tour data for the appropriate data structure required for tour-reservation API call.  
        - Input:
            {
                {
                    "id": "1003",
                    "description": "You're on a boat!",
                    "image": "https://images.pexels.com/photos/1488017/pexels-photo-1488017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "maxPax": 4,
                    "minPax": 1,
                    "name": "Gondola Tour",
                    "seats": 6,
                    "tickets": [
                        {
                            "id": "009",
                            "name": "Adult",
                            "pax": 1,
                            "price": 2500
                        },
                    ],
                    "totalPrice": 6500
                }
            }
        - Output: 
            {
                "tourId": "1001",
                "tickets": [
                    {
                        "id": "003",
                        "count": 2
                    },
                    {
                        "id": "004",
                        "count": 1
                    }
                ]
            }
    */
    const parseBookingData = (tourData) => {
        var bookingData = {
            'tourId': tourData['id'],
            'tickets': []
        };

        for (let [guestType, guestCount] of Object.entries(guests)) {
            if (!guestCount) 
                continue;
            
            let ticketWanted = tourData['tickets'].find(ticket => 
                ticket['name'].toLowerCase() == guestType.toLowerCase()
            );

            bookingData['tickets'].push({
                'id': ticketWanted['id'],
                'count': guestCount
            });
        }

        return bookingData;
    }

    /*
        Styles used by sorting button
    */
    const switchStyleColor = {
        'orange': '#ff9800',
        'purple': '#673ab7',
        'light-orange': '#ffe0b2',
        'light-purple': '#d1c4e9'
    }
    const switchStyles = {
        '& .MuiSwitch-switchBase': {
            color: sortOrder === 'asc' ? switchStyleColor['orange'] : switchStyleColor['purple'],  // Orange for 'asc', Purple for 'desc'
            '&.Mui-checked': {
                color: sortOrder === 'desc' ? switchStyleColor['purple'] : switchStyleColor['orange'], // Purple when checked for 'desc', Orange for 'asc'
            },
            '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: sortOrder === 'desc' ? switchStyleColor['light-purple'] : switchStyleColor['light-orange'], // Light purple for 'desc', Light orange for 'asc'
            },
        },
        '& .MuiSwitch-track': {
            backgroundColor: sortOrder === 'asc' ? switchStyleColor['light-orange'] : switchStyleColor['light-purple'],  // Light orange for 'asc', Light purple for 'desc'
        },
    };

    return (
        <div className='tours-display-container'>  
            <h2 className='font-bold text-lg'>Available Tours</h2>
            <Box className='tours-sort-box'>
                <FormControlLabel
                    control={
                        <Switch
                            checked={sortOrder === 'desc'}
                            onChange={handleToggleSort}
                            sx={switchStyles}
                        />
                    }
                    label={`Sort Price: ${sortOrder.toUpperCase()}`}
                />
            </Box>
            <div>
            <Container>
                <Grid container spacing={2} justifyContent="flex-start">
                    {
                        sortedTours.length > 0 ? 
                            sortedTours.map(tour => (
                                <Grid item key={tour.id} xs={12} sm={6} md={4} style={
                                    { display: 'flex', justifyContent: 'center' }}
                                >
                                    <TourCard tour={tour} actionHandler={bookTour} />
                                </Grid>
                            )) 
                            : 
                            <p>No tours available.</p>
                    }
                </Grid>
            </Container>
            </div>
        </div>
    );
}

export default ToursDisplay;
