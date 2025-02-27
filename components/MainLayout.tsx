/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import A from './A';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchLaptops } from '../store/actions/laptopActions';
import { authWithFacebook, logout } from '../store/actions/authActions';
import { Button } from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import LogoutIcon from '@mui/icons-material/Logout';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export function MainLayout({ children, title = 'Next App' }) {
	React.useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			dispatch({
				type: 'SET_USER',
				payload: user,
			});
		});
	}, []);
	const router = useRouter();
	const dispatch = useDispatch();
	const { user } = useTypedSelector((state) => state.auth);

	const filterLaptops = (key, value) => {
		let search = new URLSearchParams(window.location.search);
		search.set(key, value);
		const newUrl = `${window.location.pathname}?${search}`;
		router.push(newUrl);
		setTimeout(() => {
			dispatch(fetchLaptops());
		}, 500);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					handleMenuClose();
					logout();
				}}
			>
				Loguot
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='error'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='show 17 new notifications'
					color='inherit'
				>
					<Badge badgeContent={17} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<Head>
				<title>{title} | Next Course</title>
				<meta name='keywords' content='next youtube sanzhar' />
				<meta name='description' content='this is youtube tutorial for next' />
				<meta charSet='utf-8' />
			</Head>
			<nav>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='open drawer'
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								style={{ cursor: 'pointer' }}
								variant='h6'
								noWrap
								component='div'
								sx={{ display: { xs: 'none', sm: 'block' } }}
								onClick={() => {
									router.push('/');
								}}
							>
								LOGO
							</Typography>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									onChange={(e) => {
										filterLaptops('q', e.target.value);
									}}
									placeholder='Search…'
									inputProps={{ 'aria-label': 'search' }}
								/>
							</Search>
							<Typography
								style={{ cursor: 'pointer' }}
								variant='h6'
								noWrap
								component='div'
								sx={{ display: { xs: 'none', sm: 'block' } }}
								onClick={() => {
									router.push('/admin');
								}}
							>
								LOGO
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								{/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
								<IconButton
									size='large'
									edge='end'
									aria-label='account of current user'
									aria-controls={menuId}
									aria-haspopup='true'
									onClick={() => authWithFacebook()}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
								{!user ? (
									<Button
										// onClick={() => authWithGoogle()}
										onClick={() => router.push('/login')}
										color='inherit'
										variant='text'
									>
										Sign in
									</Button>
								) : (
									<>
										<Typography
											style={{
												cursor: 'pointer',
												display: 'flex',
												alignItems: 'center',
											}}
											variant='h6'
											component='div'
											sx={{ display: { xs: 'none', sm: 'block' } }}
											onClick={handleProfileMenuOpen}
										>
											{user.displayName}
										</Typography>
										{/* <img
                      style={{
                        borderRadius: "50%",
                        transform: "scale(0.6)",
                        border: "1px solid #fff",
                      }}
                      src={user.photoURL}
                      alt="photo"
                    /> */}
										<IconButton
											size='large'
											edge='end'
											aria-label='account of current user'
											aria-controls={menuId}
											aria-haspopup='true'
											onClick={logout}
											color='inherit'
										>
											<LogoutIcon />
										</IconButton>
									</>
								)}
							</Box>
							<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size='large'
									aria-label='show more'
									aria-controls={mobileMenuId}
									aria-haspopup='true'
									onClick={handleMobileMenuOpen}
									color='inherit'
								>
									<MoreIcon />
								</IconButton>
							</Box>
						</Toolbar>
					</AppBar>
					{renderMobileMenu}
					{renderMenu}
				</Box>
			</nav>
			<main>{children}</main>
			<style jsx>
				{`
					nav {
						position: fixed;
						height: 60px;
						left: 0;
						top: 0;
						right: 0;
						background: darkblue;
						display: flex;
						justify-content: space-around;
						align-items: center;
					}
					main {
						margin: 0 auto;
						margin-top: 60px;
						padding: 1rem;
						max-width: 1270px;
					}
				`}
			</style>
		</>
	);
}
