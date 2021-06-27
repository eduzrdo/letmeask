import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean;
	buttonStyle?: 'google';
	classes?: string[];
}

export function Button({ isOutlined = false, buttonStyle, classes = [], ...props }: ButtonProps) {
	const { theme } = useTheme();

	return (
		<button
			className={cx(
				'button',
				{ 'outlined': isOutlined },
				{ 'google': buttonStyle === 'google' },
				theme,
				...classes
			)}
			{...props}
		/>
	)
}