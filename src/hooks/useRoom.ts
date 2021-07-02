import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likes: Record<string, {
		authorId: string;
	}>;
}>

type QuestionType = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number;
	likeId: string | undefined;
}

export function useRoom(roomId: string | undefined) {
	const { user } = useAuth();
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [title, setTitle] = useState('');
	const [roomOwnerId, setRoomOwnerId] = useState('');

	useEffect(() => {
		if (roomId) {
			const roomRef = database.ref(`rooms/${roomId}`);

			roomRef.child('authorId').get().then(authorId => {
				const parsedAuthorId: string = authorId.val();
				setRoomOwnerId(parsedAuthorId);
			})

			roomRef.on('value', room => {
				const databaseRoom = room.val();

				const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

				const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
					return {
						id: key,
						author: value.author,
						content: value.content,
						isAnswered: value.isAnswered,
						isHighlighted: value.isHighlighted,
						likeCount: Object.values(value.likes ?? {}).length,
						likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
					}
				});

				setTitle(databaseRoom.title);

				const parsedQuestionsOrderedByLikes = parsedQuestions.sort((a, b) => b.likeCount - a.likeCount);

				const highlightedQuestions = parsedQuestionsOrderedByLikes.filter(question => {
					return question.isHighlighted && !question.isAnswered;
				});
				const answeredQuestions = parsedQuestionsOrderedByLikes.filter(question => question.isAnswered);
				const questionsNotHighlightedOrAnswered = parsedQuestionsOrderedByLikes.filter(question => {
					return !question.isHighlighted && !question.isAnswered;
				})

				const orderedQuestions = [
					...highlightedQuestions,
					...questionsNotHighlightedOrAnswered,
					...answeredQuestions,
				]
				setQuestions(orderedQuestions);
			});

			return () => {
				roomRef.off('value');
			}
		}
	}, [roomId, user?.id]);

	return { questions, title, roomOwnerId }
}