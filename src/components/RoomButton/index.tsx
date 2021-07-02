import cx from 'classnames';

import { useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type RoomButtonProps = {
	roomId: string;
	title: string;
	numberOfQuestions: number;
}

export function RoomButton({ roomId, title, numberOfQuestions }: RoomButtonProps) {
	const { theme } = useTheme();
	const history = useHistory();

	function handleViewRoom() {
		history.push(`/rooms/${roomId}`);
	}

	return (
		<button
			className={cx(
				'room-card',
				theme
			)}
			onClick={handleViewRoom}
		>
			<h1>{title}</h1>
			<span>{numberOfQuestions} pergunta{numberOfQuestions !== 1 && 's'}</span>
		</button>
	)
}