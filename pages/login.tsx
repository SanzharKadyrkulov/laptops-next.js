/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { authWithFacebook, authWithGoogle } from '../store/actions/authActions';

const Login = () => {
	const router = useRouter();
	const { user } = useTypedSelector((state) => state.auth);
	console.log(user);

	useEffect(() => {
		console.log(user);

		if (user) router.push('/');
	}, [user]);
	const newLocal = 'center';
	return (
		<>
			<section className='login'>
				<div className='loginContainer'>
					<div className='goBack'>
						{' '}
						<img
							className='goBack-img'
							src={
								'https://icons.veryicon.com/png/o/miscellaneous/commonly-used-icon-1/angle-brackets.png'
							}
							alt='goBack'
							onClick={() => router.push('/')}
						/>
					</div>
					<img
						className='logoImg'
						src={'https://logodix.com/logo/3547.png'}
						alt='logo'
					/>
					<label className='mainLabel'> Login</label>
					<label className='authLabel'>Email</label>
					<input
						className='authInput'
						type='text'
						autoFocus
						required
						placeholder='Email'
						// value={email}
						// onChange={(e) => {
						//   setEmail(e.target.value);
						// }}
					/>
					<p className='errorMsg'>{''}</p>
					<label className='authLabel'>Password</label>
					<input
						className='authInput'
						type='password'
						required
						placeholder='Password'
						// value={password}
						// onChange={(e) => setPassword(e.target.value)}
					/>
					<p className='errorMsg'>{''}</p>
					<div className='btnContainer'>
						<button className='authButton' onClick={() => authWithFacebook()}>
							Sign in
						</button>
						<button
							style={{ marginTop: '5px' }}
							className='authButton'
							// onClick={handleLogIn}
							onClick={() => authWithGoogle()}
						>
							Sign in with{' '}
							<img
								style={{
									width: '20px',
									marginLeft: '10px',
									alignSelf: newLocal,
								}}
								src={
									'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'
								}
							/>
						</button>
						<p className='authP'>
							Don&apos;t have an account ?
							<span
								className='authSpan'
								// onClick={() => history.push("/registration")}
							>
								Sign up
							</span>
						</p>
					</div>
				</div>
			</section>
			<style jsx>{`
				.logoImg {
					width: 70px;
					margin: 0 auto;
				}
				.login {
					width: 100%;
					min-height: 100vh;
					padding: 0 20px;
					/* background: #e9e9e9; */
					background-image: url('https://wallpaperaccess.com/full/1285952.jpg');
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					/* background-color: grey; */
					display: flex;
				}
				.loginContainer {
					padding: 30px 30px;
					margin: auto;
					width: 100%;
					max-width: 360px;
					min-height: 500px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					background: rgba(255, 255, 255, 1);
					border-radius: 20px;
					position: relative;
				}
				.mainLabel {
					align-self: center;
					color: #191919;
					font-family: 'Merienda';
					margin: 14px 0;
					display: block;
					font-size: 30px;
					line-height: 1;
				}
				.authLabel {
					color: #425277;
					font-family: 'Merienda';
					margin: 14px 0;
					display: block;
					font-size: 22px;
					line-height: 1;
				}
				.authInput {
					width: 100%;
					border: none;
					border-bottom: 1px solid rgba(129, 129, 129, 0.51);
					outline: none;
					font-size: 24px;
					/* padding: 10px; */
					/* background: rgba(0, 0, 0, 0.1); */
					/* border-radius: 10px; */
					color: #000;
					font-weight: 900;
					letter-spacing: 1px;
					transition: 0.5s;
				}
				.authInput::placeholder {
					color: #b2b9c7;
				}
				.authInput:focus {
					border-bottom: 1px solid rgba(25, 118, 210, 0.9);
				}
				.btnContainer {
					width: 100%;
					padding: 24px 0;
				}
				.authButton {
					border: none;
					border-radius: 10px;
					outline: none;
					width: 100%;
					padding: 10px 0;
					color: #000;
					font-size: 16px;
					font-weight: 500;
					letter-spacing: 1px;
					background: #1976d2;
					cursor: pointer;
					transition: 0.3s;
				}
				.authButton:hover {
					background: rgba(25, 118, 210, 0.9);
				}
				.authP {
					margin: 14px 0 0 0;
					text-align: center;
					color: #333;
					cursor: pointer;
				}
				.authSpan {
					color: #1976d2;
					font-weight: 500;
					letter-spacing: 0.5px;
					margin-left: 5px;
					cursor: pointer;
					transition: all 200ms ease-in-out;
				}
				.authSpan:hover {
					color: rgb(238, 46, 46);
				}
				.errorMsg {
					color: #1976d2;
					font-size: 16px;
				}
				.goBack {
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fff;
					color: #939cb0;
					border-radius: 100%;
					position: absolute;
					width: 35px;
					height: 35px;
					top: 35px;
					left: -15px;
					font-size: 36px;
					font-weight: 100;
					box-shadow: 10px 10px 35px -9px rgba(0, 0, 0, 0.51);
					-webkit-box-shadow: 10px 10px 35px -9px rgba(0, 0, 0, 0.51);
					-moz-box-shadow: 10px 10px 35px -9px rgba(0, 0, 0, 0.51);
				}
				/* .goBack::before {
          content: "<";
        } */
				.goBack-img {
					width: 23px;
					height: 23px;
					transform: rotate(180deg);
				}
				.goBack:hover {
					cursor: pointer;
					background-color: rgb(250, 250, 250);
				}
			`}</style>
		</>
	);
};

export default Login;
