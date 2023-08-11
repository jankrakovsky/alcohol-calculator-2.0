import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase/firebaseApp';
import useNow from './useNow';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
	const now = useNow();
	const [user, loading] = useAuthState(auth);
	const [data, setData] = useState({
		gender: 'male',
		weight: 80,
	});
	const [dataLoading, setDataLoading] = useState(true);
	const [errorCode, setErrorCode] = useState(null);
	const [drinkTime, setDrinkTime] = useState(now);

	useEffect(() => {
		if (loading) {
			setDataLoading(true);
			return;
		}

		if (!user) {
			setErrorCode('USER_NOT_LOGGED_IN');
			setDataLoading(false);
			return;
		}

		setDataLoading(true);
		const docRef = doc(db, `profiles/${user.uid}`);

		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				const snapData = docSnap.data();
				setData({
					gender: snapData.gender,
					weight: snapData.weight,
				});
				/* clear any existing error code */
				setErrorCode(null);
			} else {
				setErrorCode('USER_DATA_NOT_FOUND');
			}

			setDataLoading(false);
		});
	}, [user, loading]);

	const value = { data, setData, loading: dataLoading, errorCode, drinkTime, setDrinkTime };

	return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserDataContext = () => useContext(UserDataContext);
