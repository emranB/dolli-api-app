// components/TourCard.jsx
import React from 'react';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/*
    TourCard
    - Accepts 'tour' element as input
        - Expected data structure:
            {
                "id": "1001",
                "description": "A tour of the local camel farm.",
                "image": "https://images.pexels.com/photos/628661/pexels-photo-628661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "maxPax": 8,
                "minPax": 0,
                "name": "Camel Farm Tour",
                "seats": 3,
                "tickets": [
                    { "id": "001", "name": "Adult", "pax": 1, "price": 1000 },
                    { "id": "002", "name": "Child", "pax": 1, "price": 500 },
                    { "id": "003", "name": "Senior", "pax": 1, "price": 800 },
                    { "id": "004", "name": "Infant", "pax": 1, "price": 0 }
                ]
            }
    - Used to display a card for each tour element returned by ToursSearch component
    - Cards are rendered by the ToursDisplay component
*/
function TourCard({ tour, actionHandler }) {

    return (
        <Card className='card-root'>
            <CardMedia
                component='img'
                className='card-media'
                image={tour.image}
                alt={`Image of ${tour.name}`}
            />

            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {tour.name}
                </Typography>
                <Typography variant="body2" color='text.secondary'>
                    {tour.description}
                </Typography>

                <Typography variant='body1' color='text.primary'>
                    Total Price: ${tour.totalPrice} CAD
                </Typography>
            </CardContent>

            <CardActions className='card-actions'>
                <Button
                    size='small'
                    fullWidth
                    onClick={() => {actionHandler(tour)}}
                    className='book-now-button'
                >
                    BOOK NOW
                </Button>
            </CardActions>
        </Card>
    );
}

export default TourCard;
