import cx from 'classnames';

import { Header } from '../../components/Header';
import { RoomButton } from '../../components/RoomButton';
import { Button } from '../../components/Button';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

import './styles.scss';

export function MyRooms() {
	const { theme } = useTheme();
	const { userRooms } = useAuth();
	const history = useHistory();

	function handleNewRoom() {
		history.push('/rooms/new')
	}

	return (
		<div id='page-my-rooms' className={cx(theme)}>
			<Header>
				<Button onClick={handleNewRoom}>
					Nova sala
				</Button>
			</Header>

			<main>
				{userRooms.map(room => (
					<RoomButton
						key={room.roomId}
						roomId={room.roomId}
						title={room.title}
						numberOfQuestions={room.questions.length}
					/>
				))}
			</main>
		</div>
	)
}