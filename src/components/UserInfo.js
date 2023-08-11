import { doc, setDoc } from 'firebase/firestore';

import 'rc-time-picker/assets/index.css';
import { Save } from '@mui/icons-material';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';

import { auth, db } from '../firebase/firebaseApp';
import useNow from '../hooks/useNow';
import { useUserDataContext } from '../hooks/useUserDataContext';

const UserInfo = () => {
	const [user] = useAuthState(auth);
	const now = useNow();
	const { data, setData, loading, errorCode, drinkTime, setDrinkTime } = useUserDataContext();
	const { register, handleSubmit, control } = useForm({
		defaultValues: {
			gender: data?.gender ?? 'male',
			weight: data?.weight ?? 80,
			time: drinkTime,
		},
	});

	const onSubmit = async (data) => {
		setData(data);

		const profileRef = doc(db, `profiles/${user.uid}`);
		const res = await setDoc(profileRef, {
			weight: data.weight,
			gender: data.gender,
		});
		return res;
	};

	const onError = (errors, e) => console.log(errors, e);

	return (
		<form className="flex flex-col gap-2 rounded-md text-dark dark:text-light md:flex-row" onSubmit={handleSubmit(onSubmit, onError)}>
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
						{...register('weight', { required: true })}
					/>
					<span className="dark:text-dark">kg</span>
				</div>
			</article>

			{/* drinking end time input */}
			<article className="flex w-80 flex-col justify-between gap-2 rounded-md bg-accent-light p-2 dark:bg-accent">
				<label className="dark:text-dark">Kdy jste skončili s konzumací alkoholu?</label>
				<div className="flex items-center gap-2">
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TimePicker
								className="w-28"
								showSecond={false}
								minuteStep={15}
								allowEmpty={false}
								onBlur={onBlur}
								onChange={(val) => {
									setDrinkTime(val ? val.toDate() : now);
									onChange(val ? val.toDate() : now);
								}}
								value={moment(value)}
							/>
						)}
						name="time"
					/>
				</div>
			</article>

			{/* show save button only when user logged in */}
			{user && (
				<button className="rounded-lg bg-accent p-4 text-xl text-dark dark:bg-accent-dark dark:text-light" type="submit">
					<Save />
					<p>Uložit</p>
				</button>
			)}
		</form>
	);
};

export default UserInfo;
