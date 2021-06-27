import { ReactNode } from 'react';
import classNames from 'classnames';

import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
	isAnswered?: boolean;
	isHighlighted?: boolean;
}

export function Question({
	content,
	author,
	children,
	isAnswered = false,
	isHighlighted = false,
}: QuestionProps) {
	const { theme } = useTheme();

	return (
		<div
			className={classNames(
				'question',
				{ answered: isAnswered },
				{ highlighted: isHighlighted && !isAnswered, },
				theme,
			)}
		>
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>
					{children}
				</div>
			</footer>
		</div>
	)
}