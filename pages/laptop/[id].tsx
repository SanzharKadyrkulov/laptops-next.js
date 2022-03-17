/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../components/MainLayout';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchOneLaptop } from '../../store/actions/laptopActions';

export default function Laptop() {
	const { query } = useRouter();
	const { laptop } = useTypedSelector((state) => state.laptop);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOneLaptop(+query.id));
	}, []);
	return (
		<>
			<>
				<MainLayout>
					{laptop ? (
						<>
							<div
								style={{
									display: 'flex',
									maxWidth: '1240px',
									margin: '0 auto',
								}}
							>
								<img
									src={laptop.image}
									style={{ maxWidth: '500px', marginRight: '100px' }}
								/>
								<div style={{ width: '100%' }}>
									<h2>{laptop.productName}</h2>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											width: '30%',
											margin: '10px 0 30px',
										}}
									>
										{/* <Rating name="read-only" value={rating} readOnly /> */}
										{/* <IconButton */}
										{/* // color={checkItemInCart(item.id)}
                    // onClick={() => addProductToCart(item)} */}
										{/* > */}
										{/* <div>
                      <CommentIcon
                        aria-label="add to shopping"
                        color="warning"
                        // onClick={() =>
                        //   history.push(`/rating/${laptop.id}`)
                        // }
                      />
                      comment
                    </div> */}
										{/* </IconButton> */}
										{/* <div>
                      <BookmarkBorderIcon
                        color={checkItemInFav(laptop.id)}
                        aria-label="add to shopping"
                        onClick={() => favProductToCart(laptop)}
                      />
                      favorite
                    </div> */}
									</div>
									<p style={{ marginBottom: '20px' }}>{laptop.description}</p>
									<p style={{ marginBottom: '20px' }}>CPU: {laptop.cpu}</p>
									<p style={{ marginBottom: '20px' }}>RAM: {laptop.ram}</p>
									<p style={{ marginBottom: '20px' }}>
										Storage: {laptop.storage}
									</p>
									<p style={{ marginBottom: '20px' }}>
										Screen: {laptop.screen}
									</p>
								</div>
							</div>
							<Container
								style={{ marginBottom: '25px' }}
								maxWidth='sm'
							></Container>
						</>
					) : (
						<CircularProgress />
					)}
				</MainLayout>
			</>
		</>
	);
}
