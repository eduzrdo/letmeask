import { FormEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import illustrationImg from '../../assets/images/illustration.svg';
import illustrationDarkImg from '../../assets/images/illustration-dark.svg';
import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

export function Home() {
	const [roomCode, setRoomCode] = useState('');
	const { user, signInWithGoogle } = useAuth();
	const { handleTitleChange } = usePageTitle();
	const { theme } = useTheme();
	const history = useHistory();

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('A sala que você está tentando acessar não existe.');
			return;
		}

		if (roomRef.val().endedAt) {
			alert('Esta sala foi encerrada pelo adminstrador.');
			return;
		}

		history.push(`/rooms/${roomCode}`);
	}

	useEffect(() => {
		handleTitleChange('Login - Letmeask');
	}, [handleTitleChange]);

	return (
		<div id='page-auth' className={cx(theme)}>
			<aside>
				<img
					src={theme === 'dark-theme' ? illustrationDarkImg : illustrationImg}
					alt='Ilustração simbolizando perguntas e respostas'
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>

			<main>
				<div className='main-content'>
					<img
						src={theme === 'dark-theme' ? logoDarkImg : logoImg}
						alt='Letmeask'
					/>
					{/* <button onClick={handleCreateRoom} className='create-room'>
						<img src={googleIconImg} alt='Logo do Google' />
						Crie sua sala com o Google
					</button> */}
					<Button onClick={handleCreateRoom} classes={['create-room']} buttonStyle='google' >
						<img src={googleIconImg} alt='Logo do Google' />
						Crie sua sala com o Google
					</Button>
					<div className='separator'>Ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder='Digite o código da sala'
							onChange={event => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type='submit'>
							Entrar na sala
						</Button>
					</form>
				</div>
			</main>
		</div>
	)
}