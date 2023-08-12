import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AvatarIcon, Cross1Icon, MixerVerticalIcon, UpdateIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

import { auth, db, provider } from '../firebase/firebaseApp';
import { useUserDataContext } from '../hooks/UserDataContext';
import Tooltip from './Tooltip';

const UserDataDialog = ({ children, ...props }) => {
	const [user] = useAuthState(auth);
	const [isOpen, setIsOpen] = useState(false);
	const [portal, setPortal] = useState(null);
	const { data, setData, loading, errorCode } = useUserDataContext();
	const { register, handleSubmit, watch, setValue, reset } = useForm({
		defaultValues: {
			gender: data?.gender ?? 'male',
			weight: data?.weight ?? 80,
			metric: true,
		},
	});

	const formData = watch();
	const toggleUnit = () => {
		const convertedValue = formData.metric ? formData.weight * 2.20462 : formData.weight / 2.20462;
		setValue('weight', Math.round(convertedValue * 2) / 2);
	};

	const onSubmit = async (formData) => {
		setData(formData);
		setIsOpen(false);

		if (user) {
			const profileRef = doc(db, `profiles/${user.uid}`);
			const res = await setDoc(profileRef, {
				weight: formData.weight,
				gender: formData.gender,
				metric: formData.metric,
			});
			return res;
		}
	};

	/* TODO: Handle form errors */
	const onError = (errors, e) => console.error(errors, e);

	return (
		<>
			<DialogPrimitive.Root
				open={isOpen}
				onOpenChange={() => {
					setIsOpen(!isOpen);
					reset({
						gender: data?.gender ?? 'male',
						weight: data?.weight ?? 80,
						metric: data?.metric ?? true,
					});
				}}
				{...props}
			>
				<DialogPrimitive.Trigger asChild>
					{/* login/logout button */}
					<Tooltip className="group" title="Nastavení uživatele">
						<button className="rounded-full hover:bg-transparent dark:hover:bg-transparent">
							{user ? (
								<Image
									className="rounded-full ring ring-transparent transition duration-300 group-hover:ring-accent"
									src={user.photoURL}
									alt={user.displayName}
									width={28}
									height={28}
								/>
							) : (
								<AvatarIcon className="h-[28px] w-[28px] text-accent" />
							)}
						</button>
					</Tooltip>
				</DialogPrimitive.Trigger>
				<DialogPrimitive.Portal forceMount container={portal}>
					<Transition.Root show={isOpen}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<DialogPrimitive.Overlay forceMount className="fixed inset-0 z-20 bg-black/50" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPrimitive.Content
								forceMount
								className={clsx(
									'fixed z-50',
									'w-[95vw] max-w-sm rounded-lg p-4 md:w-full',
									'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
									'bg-accent-light dark:bg-accent-dark',
									'focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75',
								)}
							>
								<div className="flex items-center justify-between gap-4">
									<DialogPrimitive.Title className="text-lg">Vaše nastavení</DialogPrimitive.Title>
									<DialogPrimitive.Close className="focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75">
										<Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
									</DialogPrimitive.Close>
								</div>
								<DialogPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
									Pro přesné výsledky budeme potřebovat pár údajů.
								</DialogPrimitive.Description>

								<form
									className="mt-2 flex flex-col gap-2 rounded-md text-dark dark:text-light"
									onSubmit={handleSubmit(onSubmit, onError)}
								>
									{/* gender picker */}
									<article className="flex items-center justify-between gap-2 rounded-md bg-light/50 p-2 dark:bg-dark/70">
										<label>Vyberte Vaše pohlaví</label>
										<div className="relative flex justify-between rounded-md text-center text-sm">
											{/* sliding background */}
											<div
												className={`absolute h-full w-1/2 transform p-1 transition-transform duration-300 ${
													formData.gender === 'male' ? 'translate-x-0' : 'translate-x-full'
												}`}
											>
												<div className="h-full rounded-md bg-accent/60" />
											</div>
											{/* radio and label for male */}
											<input
												id="male"
												{...register('gender')}
												type="radio"
												value="male"
												className="sr-only" // hide the default radio
											/>
											<label
												htmlFor="male"
												className="relative z-10 w-1/2 cursor-pointer rounded-l-md border border-r-0 border-accent px-2 py-1"
											>
												Muž
											</label>

											{/* radio and label for female */}
											<input
												id="female"
												{...register('gender')}
												type="radio"
												value="female"
												className="sr-only" // hide the default radio
											/>
											<label
												htmlFor="female"
												className="relative z-10 w-1/2 cursor-pointer rounded-r-md border border-l-0 border-accent px-2 py-1"
											>
												Žena
											</label>
										</div>
									</article>

									{/* weight input */}
									<article className="flex items-center justify-between gap-2 rounded-md bg-light/50 p-2 dark:bg-dark/70">
										<label>Zadejte Vaši váhu</label>
										<div className="flex items-center gap-2 text-sm">
											<input
												className="w-20 rounded-md border border-accent bg-transparent p-2 leading-3 focus:outline-none dark:text-light dark:placeholder-gray-300"
												type="number"
												step="0.5"
												placeholder="váha"
												{...register('weight', { required: true })}
											/>
											<input
												className="sr-only" // hide the default radio
												id="metric"
												type="checkbox"
												{...register('metric')}
												onChange={(e) => {
													register('metric').onChange(e);
													toggleUnit();
												}}
											/>
											<label htmlFor="metric" className="relative z-10 flex cursor-pointer select-none gap-1">
												<p>{formData.metric ? 'kg' : 'lbs'}</p>
												<UpdateIcon className="h-3 w-3" />
											</label>
										</div>
									</article>

									<div className="mt-4 flex items-end justify-between gap-4">
										<button
											type={user && 'button'}
											className={clsx(
												'inline-flex h-12 select-none items-center justify-center gap-2 rounded-md p-2 text-sm font-medium',
												'bg-accent/60 text-dark transition hover:bg-light/50 dark:bg-accent/40 dark:text-light dark:hover:bg-dark/70',
												'border-2 border-transparent hover:border-accent',
												'group focus:outline-none focus-visible:ring focus-visible:ring-dark focus-visible:ring-opacity-75 dark:focus-visible:ring-light',
											)}
											onClick={() => (user ? signOut(auth) : signInWithPopup(auth, provider))}
										>
											{/* login/logout button */}
											{user ? (
												<>
													<Image
														className="rounded-full ring ring-transparent transition group-hover:ring-accent"
														src={user.photoURL}
														alt={user.displayName}
														width={18}
														height={18}
													/>
													<p>Odhlásit se</p>
												</>
											) : (
												<>
													<AvatarIcon className="h-[18px] w-[18px] text-dark dark:text-light" />
													<p>Přihlásit se</p>
												</>
											)}
										</button>

										<button
											className={clsx(
												'inline-flex h-12 select-none items-center justify-center gap-2 rounded-md p-2 text-sm font-medium',
												'bg-accent/60 text-dark transition hover:bg-light/50 dark:bg-accent/40 dark:text-light dark:hover:bg-dark/70',
												'border-2 border-transparent hover:border-accent',
												'focus:outline-none focus-visible:ring focus-visible:ring-dark focus-visible:ring-opacity-75 dark:focus-visible:ring-light',
											)}
											type="submit"
										>
											<MixerVerticalIcon className="h-[18px] w-[18px] text-dark dark:text-light" />
											<p>Uložit</p>
										</button>
									</div>
								</form>
							</DialogPrimitive.Content>
						</Transition.Child>
					</Transition.Root>
				</DialogPrimitive.Portal>
			</DialogPrimitive.Root>
			<div ref={setPortal} />
		</>
	);
};

export default UserDataDialog;
