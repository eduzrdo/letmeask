import { ReactNode } from 'react';
import { RoomCode } from '../RoomCode';
// import { Button } from '../Button';

import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import sunImg from '../../assets/images/light.svg';
import moonImg from '../../assets/images/dark.svg';

import './styles.scss';

// import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

type HeaderProps = {
	roomId?: string;
	children?: ReactNode;
}

export function Header({ roomId, children }: HeaderProps) {
	// const { user } = useAuth();
	const { theme, handleToggleTheme } = useTheme();

	return (
		<header>
			<div className='content'>
				<div className="left">
					<img src={theme === 'dark-theme' ? logoDarkImg : logoImg} alt='Letmeask' />
					<button onClick={handleToggleTheme}>
						<img
							src={theme === 'dark-theme' ? sunImg : moonImg}
							alt={theme === 'dark-theme' ? 'Escolher tema claro' : 'Escolher tema claro'}
						/>
					</button>
				</div>
				<div className='right'>
					{roomId && <RoomCode code={roomId} />}
					{/* {user && (
						<Button isOutlined onClick={logOut}>
							Sair
						</Button>
					)} */}
					{children}
				</div>
			</div>
		</header>
	)
}