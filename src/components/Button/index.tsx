import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean;
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
	const { theme } = useTheme();

	return (
		<button
			// className={`button ${isOutlined ? 'outlined' : ''}`}
			className={cx(
				'button',
				{ 'outlined': isOutlined },
				theme,
			)}
			{...props}
		/>
	)
}