import copyImg from '../../assets/images/copy.svg';
import cx from 'classnames';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';

type RoomCodeProps = {
	code: string;
}

export function RoomCode(props: RoomCodeProps) {
	const { theme } = useTheme();

	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(props.code);
	}

	return (
		<button
			className={cx(
				'room-code',
				theme,
			)}
			onClick={copyRoomCodeToClipboard}
		>
			<div>
				<img src={copyImg} alt='Copy room code' />
			</div>
			<span>Sala #{props.code}</span>
		</button>
	)
}