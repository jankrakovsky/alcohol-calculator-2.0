import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

import { auth, db } from '../firebase/firebaseApp';

const UserInfo = ({ userData, setUserData }) => {
	const [user] = useAuthState(auth);
	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			...userData,
			time: format(userData.time, 'HH:mm'),
		},
	});

	const onSubmit = async (data) => {
		setUserData((prevUserData) => ({
			...prevUserData,
			...data,
			time: format(data.time, 'HH:mm'),
		}));
		const profileRef = doc(db, `profiles/${user.uid}`);

		const res = await setDoc(profileRef, {
			weight: userData.weight,
			gender: userData.gender,
		});
		return res;
	};

	return (
		<form className="flex flex-col gap-2 rounded-md text-dark dark:text-light md:flex-row" onSubmit={handleSubmit(onSubmit)}>
			{/* gender picker */}
			<article className="flex w-80 flex-col justify-between gap-2 rounded-md bg-accent-light p-2 dark:bg-accent md:w-48">
				<label className="dark:text-dark">Vyberte Vaše pohlaví</label>
				<div className="flex flex-col gap-2 dark:text-dark">
					<span>
						<input id="male" {...register('gender')} type="radio" value="male" />
						<label className="pl-2">Muž</label>
					</span>
					<span>
						<input id="female" {...register('gender')} type="radio" value="female" />
						<label className="pl-2">Žena</label>
					</span>
				</div>
			</article>

			{/* weight input */}
			<article className="flex w-80 flex-col justify-between gap-2 rounded-md bg-accent-light p-2 dark:bg-accent md:w-40">
				<label className="dark:text-dark">Zadejte Vaši váhu</label>
				<div className="flex items-center gap-2">
					<input
						className="w-16 rounded-md p-2 focus:outline-none dark:bg-dark dark:text-light dark:placeholder-gray-300"
						placeholder="váha"
						{...register('weight')}
					/>
					<span className="dark:text-dark">kg</span>
				</div>
			</article>

			{/* drinking end time input */}
			<article className="flex w-80 flex-col justify-between gap-2 rounded-md bg-accent-light p-2 dark:bg-accent">
				<label className="dark:text-dark">Kdy jste skončili s konzumací alkoholu?</label>
				<div className="flex items-center gap-2">
					<TextField
						id="time"
						type="time"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300, // 5 min
						}}
						sx={{ width: '150px' }}
						{...register('time')}
					/>
				</div>
			</article>

			<Button className="rounded-lg bg-accent text-xl text-dark dark:bg-accent-dark dark:text-light" type="submit">
				Uložit
			</Button>
		</form>
	);
};

export default UserInfo;
