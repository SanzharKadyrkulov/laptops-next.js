import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function LaptopCard({ laptop }) {
	const router = useRouter();
	return (
		<Card sx={{ maxWidth: 345 }} style={{ marginTop: '20px' }}>
			<CardMedia
				component='img'
				height='140'
				image={laptop.image}
				alt='green iguana'
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{laptop.productName}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
				<Typography gutterBottom variant='h6' component='div'>
					{laptop.price}$
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small'>Buy</Button>
				<Button onClick={() => router.push(`laptop/${laptop.id}`)} size='small'>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}
