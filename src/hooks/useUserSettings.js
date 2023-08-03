import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase/firebaseApp';

const useUserSettings = () => {
	const [user, loading] = useAuthState(auth);
	const [userSettings, setUserSettings] = useState(null);
	const [settingsLoading, setSettingsLoading] = useState(true);
	const [errorCode, setErrorCode] = useState(null);

	useEffect(() => {
		if (loading) return;

		if (!user) {
			setErrorCode('USER_NOT_LOGGED_IN');
			setSettingsLoading(false);
			return;
		}

		setSettingsLoading(true);
		const docRef = doc(db, `profiles/${user.uid}`);

		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				const userData = docSnap.data();
				setUserSettings({
					gender: userData.gender,
					weight: userData.weight,
				});
				setErrorCode(null); // clear any existing error code
			} else {
				setErrorCode('USER_SETTINGS_NOT_FOUND');
			}

			setSettingsLoading(false);
		});
	}, [user, loading]);

	return { data: userSettings, loading: settingsLoading, errorCode };
};

export default useUserSettings;
