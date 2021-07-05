import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';
import { database } from '../../services/firebase';

import emptyQuestionsImg from '../../assets/images/empty-questions.svg'
import emptyQuestionsDarkImg from '../../assets/images/empty-questions-dark.svg'

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { Header } from '../../components/Header';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useTheme } from '../../hooks/useTheme';

import '../Room/styles.scss';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const history = useHistory();

	const { user } = useAuth();
	const { handleTitleChange } = usePageTitle();
	const { title, questions, roomOwnerId } = useRoom(roomId);
	const { theme } = useTheme();

	async function handleEndRoom() {
		const isDeletionConfirmed = window.confirm('Tem certeza que deseja encerrar a sala?');

		if (!isDeletionConfirmed) {
			return;
		}

		if (user && user.id === roomOwnerId) {
			await database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			});

			alert('Sala encerrada.');

			history.push('/');
		} else {
			alert('Você precisa estar logado como adminsitrador da sala para encerrá-la.');
			return;
		}
	}

	async function handleDeleteQuestion(questionId: string) {
		if (user && user.id === roomOwnerId) {
			if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
				await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
				return;
			}
		} else {
			alert('Você precisa estar logado como administrador da sala para excluir a pergunta.');
		}
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		if (user && user.id === roomOwnerId) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
				isAnswered: true
			});
		} else {
			alert('Você precisa estar logado como administrador da sala para marcar a pergunta como respondida.');
		}
	}

	async function handleHighlightQuestion(questionId: string) {
		if (user && user.id === roomOwnerId) {
			const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`);
			const isQuestionHighlighted = await (await questionRef.get()).val().isHighlighted;

			questionRef.update({
				isHighlighted: !isQuestionHighlighted
			});
		} else {
			alert('Você precisa estar logado como administrador da sala para dar destaque à pergunta.');
		}
	}

	useEffect(() => {
		handleTitleChange(`${questions.length} pergunta${questions.length === 1 ? '' : 's'} - ${title}`);
	}, [handleTitleChange, questions, title]);

	return (
		<div id="page-room" className={cx(theme)}>
			<Header roomId={roomId}>
				<Button onClick={() => history.push(`/rooms/${roomId}`)} classes={['manage-rooms']}>
					Fazer pergunta
				</Button>
				<Button isOutlined onClick={handleEndRoom}>
					Encerrar sala
				</Button>
			</Header>

			<main>
				<div className="room-title">
					<h1>{title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>}
				</div>

				<div className="question-list">

					{questions.map(question => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isAnswered={question.isAnswered}
								isHighlighted={question.isHighlighted}
							>
								{!question.isAnswered && (
									<>
										<button
											type='button'
											onClick={() => handleCheckQuestionAsAnswered(question.id)}
										>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>
										<button
											type='button'
											onClick={() => handleHighlightQuestion(question.id)}
										>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>
									</>
								)}
								<button
									type='button'
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							</Question>
						)
					})}

				</div>

				{!questions.length && (
					<div className='no-questions-warning'>
						<img src={theme === 'dark-theme' ? emptyQuestionsDarkImg : emptyQuestionsImg} alt='Não há perguntas' />
						<h1>Nenhuma pergunta por aqui...</h1>
						<p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
					</div>
				)}
			</main>
		</div>
	)
}