import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase/firebaseApp';
import useNow from './useNow';

const UserDataContext = createContext({
	data: null,
	setData: () => {},
	loading: true,
	errorCode: null,
	fetchData: () => {},
});

export const UserDataProvider = ({ children }) => {
	const now = useNow();
	const [user, loading] = useAuthState(auth);
	const [data, setData] = useState(null);
	const [dataLoading, setDataLoading] = useState(true);
	const [errorCode, setErrorCode] = useState(null);

	const fetchData = useCallback(async () => {
		setDataLoading(true);
		const docRef = doc(db, `profiles/${user.uid}`);

		try {
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const snapData = docSnap.data();
				setData({
					gender: snapData.gender,
					weight: snapData.weight,
					metric: snapData.metric,
				});
				setErrorCode(null);
			} else {
				setErrorCode('USER_DATA_NOT_FOUND');
			}
		} catch (error) {
			setErrorCode('FETCH_ERROR');
			console.error('Error fetching user data: ', error);
		} finally {
			setDataLoading(false);
		}
	}, [user?.uid]);

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
		fetchData();
	}, [user, loading, fetchData]);

	const value = { data, setData, loading: dataLoading, errorCode, fetchData };

	return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserDataContext = () => useContext(UserDataContext);
