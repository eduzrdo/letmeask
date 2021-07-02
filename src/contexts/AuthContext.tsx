import { useEffect, useState, createContext, ReactNode } from "react";
import { auth, database, firebase } from "../services/firebase";

type User = {
	id: string;
	name: string;
	avatar: string;
}

type FirebaseRooms = Record<string, {
	authorId: string;
	questions: [];
	title: string;
}>

type Rooms = {
	roomId: string;
	authorId: string;
	questions: [];
	title: string;
}

type AuthContextType = {
	user: User | undefined;
	userRooms: Rooms[];
	signInWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
}

type AuthcontextProviderProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthcontextProviderProps) {
	const [user, setUser] = useState<User>();
	const [userRooms, setUserRooms] = useState<Rooms[]>([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Account.');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				});
			}
		});

		// if (user) {
		// 	const roomsRef = database.ref('rooms');

		// 	roomsRef.once('value', rooms => {
		// 		const roomsSnapshot = rooms.val();

		// 		const roomsData: FirebaseRooms = roomsSnapshot ?? {};
		// 		const parsedRooms = Object.entries(roomsData).map(([key, value]) => {
		// 			return {
		// 				roomId: key,
		// 				authorId: value.authorId,
		// 				questions: value.questions,
		// 				title: value.title,
		// 			}
		// 		});

		// 		const filteredRooms = parsedRooms.filter(room => room.authorId === user.id);

		// 		setUserRooms(filteredRooms);
		// 	});
		// }

		return () => {
			unsubscribe();
		}
	}, [user]);

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider);

		if (result.user) {
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL) {
				throw new Error('Missing information from Google Account.');
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			})
		}
	}

	async function logout() {
		await auth.signOut();
	}

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle, logout, userRooms }}>
			{props.children}
		</AuthContext.Provider>
	)
}