import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import '../Room/styles.scss';
import { usePageTitle } from '../../hooks/usePageTitle';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const history = useHistory();

	const { user, signInWithGoogle } = useAuth();
	const { handleTitleChange } = usePageTitle();
	const { title, questions } = useRoom(roomId);

	async function handleEndRoom() {
		if (!user) {
			alert('Você precisa estar logado como adminsitrador da sala para encerrá-la.');
			await signInWithGoogle();
			return;
		}
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/');
	}

	async function handleDeleteQuestion(questionId: string) {
		if (user) {
			if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
				await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
			}
		}
	}

	useEffect(() => {
		handleTitleChange(`${questions.length} pergunta${questions.length === 1 ? '' : 's'} - ${title}`);
	}, [handleTitleChange, questions, title]);

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar sala
						</Button>
					</div>
				</div>
			</header>

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
							>
								<button
									type='button'
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt="Remover pergunta" />
								</button>
							</Question>
						)
					})}
				</div>
			</main>
		</div>
	)
}