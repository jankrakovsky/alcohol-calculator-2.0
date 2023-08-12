import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { AccountCircle } from '@mui/icons-material';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, provider } from '../firebase/firebaseApp';
import Tooltip from './Tooltip';
import UserInfo from './UserInfo';

const UserDataDialog = ({ children, ...props }) => {
	const [user] = useAuthState(auth);
	const [isOpen, setIsOpen] = useState(false);
	const [portal, setPortal] = useState(null);

	return (
		<>
			<DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
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
								<AccountCircle fontSize="medium" className="text-accent" />
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
									'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
									'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
									'bg-white dark:bg-gray-800',
									'focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75',
								)}
							>
								<DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
									Uživatelská data eso peso
								</DialogPrimitive.Title>
								<DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
									Make changes to your profile here. Click save when you&apos;re done.
								</DialogPrimitive.Description>
								<article>
									<h2 className="mb-4 text-2xl font-bold">Uživatelská data</h2>
									<UserInfo />
								</article>

								<div className="mt-4 flex justify-end gap-4">
									{/* login/logout button */}
									{user ? (
										<Tooltip className="group" title={`Odhlásit ${user.displayName}`} onClick={() => signOut(auth)}>
											<button className="rounded-full hover:bg-transparent dark:hover:bg-transparent">
												<Image
													className="rounded-full ring ring-transparent transition duration-300 group-hover:ring-accent"
													src={user.photoURL}
													alt={user.displayName}
													width={28}
													height={28}
												/>
											</button>
										</Tooltip>
									) : (
										<Tooltip className="group" title={`Přihlásit se`} onClick={() => signInWithPopup(auth, provider)}>
											<button className="rounded-full hover:bg-transparent dark:hover:bg-transparent">
												<AccountCircle fontSize="medium" className="text-accent" />
											</button>
										</Tooltip>
									)}
									<DialogPrimitive.Close
										className={clsx(
											'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
											'bg-accent/80 text-white transition-colors hover:bg-accent dark:text-light',
											'border border-transparent',
											'focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75',
										)}
									>
										Uložit
									</DialogPrimitive.Close>
								</div>

								<DialogPrimitive.Close
									className={clsx(
										'absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1',
										'focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75',
									)}
								>
									<Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
								</DialogPrimitive.Close>
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
