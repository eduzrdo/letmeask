import { ReactNode } from 'react';
import cx from 'classnames';

import { RoomCode } from '../RoomCode';
import { Button } from '../Button';

import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';

import { useTheme } from '../../hooks/useTheme';

import { useRoom } from '../../hooks/useRoom';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

import './styles.scss';

type HeaderProps = {
	roomId?: string;
	children?: ReactNode;
	isAdminPage?: boolean;
}

export function Header({ roomId, children, isAdminPage }: HeaderProps) {
	const { theme, handleToggleTheme } = useTheme();
	const { roomOwnerId } = useRoom(roomId);
	const { user, logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		await logout();
		history.push('/');
	}

	return (
		<header className={cx(theme)}>
			<div className='content'>
				<div className="left">
					<img src={theme === 'dark-theme' ? logoDarkImg : logoImg} alt='Letmeask' />
					<button onClick={handleToggleTheme}>
						{theme === 'dark-theme' ? (
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12.6058" cy="12.3919" r="4.78817" stroke="#737380" strokeWidth="1.5" />
								<path d="M12.6057 1.93726V5.49534M12.6057 19.2886V22.8467M23.0603 12.3921L19.5022 12.3921M5.7092 12.3918L2.15112 12.3918M19.9983 4.99951L17.4823 7.51545M7.72898 17.2688L5.21304 19.7847M19.9983 19.7844L17.4823 17.2685M7.72922 7.51514L5.21328 4.99919" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						) : (
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.1634 15.5119C20.2774 15.7586 19.3436 15.8905 18.379 15.8905C12.6606 15.8905 8.02501 11.2549 8.02501 5.53659C8.02501 4.78325 8.10547 4.0487 8.25825 3.34106C5.05223 4.87051 2.83691 8.14198 2.83691 11.9309C2.83691 17.1841 7.09549 21.4427 12.3487 21.4427C16.3352 21.4427 19.7489 18.9903 21.1634 15.5119Z" stroke="#737380" strokeWidth="1.5" strokeLinejoin="round" />
							</svg>
						)}
					</button>
				</div>
				<div className='right'>
					{roomId && <RoomCode code={roomId} />}
					{children}
					{isAdminPage && (
						<Button onClick={() => history.push(`/rooms/${roomId}`)} classes={['manage-rooms']}>
							Fazer pergunta
						</Button>
					)}
					{user?.id === roomOwnerId && !isAdminPage && (
						<Button onClick={() => history.push(`/admin/rooms/${roomId}`)} classes={['manage-rooms']}>
							Gerenciar sala
						</Button>
					)}
					{user && (
						<Button onClick={handleLogout} isOutlined >
							Sair
						</Button>
					)}
				</div>
			</div>
		</header>
	)
}