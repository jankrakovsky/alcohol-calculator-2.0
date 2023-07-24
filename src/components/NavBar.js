import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, provider } from '../firebase/firebaseApp';
import HelperTooltip from './HelperTooltip';

const NavBar = () => {
	/* links for navbar */
	const links = useMemo(
		() => [
			{
				href: '/',
				label: 'Úvod',
			},
			{
				href: '/kalkulacka',
				label: 'Kalkulačka',
			},
			{
				href: '/o-projektu',
				label: 'O projektu',
			},
		],
		[],
	);

	const [user] = useAuthState(auth);

	/* open/close mobile burger menu */
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	/* choose the screen size */
	const handleResize = useCallback(() => {
		if (window.innerWidth > 640) setMobileNavOpen(false);
	}, []);

	/*  add event listener and remove it on cleanup */
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return (
		/* navbar wrapper that centers navbar content */
		<section
			className={`fixed left-0 top-0 sm:static sm:flex sm:justify-center ${
				mobileNavOpen ? 'z-20 bg-accent-light/25 backdrop-blur dark:bg-accent-dark/25' : ''
			}`}
		>
			{mobileNavOpen ? (
				/* close navigation button for mobile */
				<Button
					className="fixed right-0 top-0 p-6 text-accent hover:bg-transparent hover:text-accent-dark dark:hover:text-accent-light"
					onClick={() => setMobileNavOpen(false)}
				>
					<CloseRoundedIcon />
				</Button>
			) : (
				/* open navigation button for mobile */
				<Button
					className="fixed right-0 top-0 rounded-bl-lg p-6 text-accent hover:bg-light hover:text-accent-dark hover:dark:bg-dark dark:hover:text-accent-light sm:hidden"
					onClick={() => setMobileNavOpen(true)}
				>
					<MenuRoundedIcon />
				</Button>
			)}

			{/* navbar */}
			<nav
				className={`h-screen w-full p-6 pb-4 sm:h-auto ${
					mobileNavOpen ? 'flex' : 'hidden'
				} flex-col items-center justify-center gap-6 border-b-2 border-solid border-transparent sm:flex sm:flex-row sm:gap-x-12 sm:border-accent-light sm:dark:border-accent-dark`}
			>
				{/* array map links */}
				{links.map((link, i) => (
					<Link
						className="border-b-2 border-solid border-transparent text-xl transition-colors duration-300 hover:border-accent hover:text-accent dark:text-light sm:text-base"
						key={i}
						href={link.href}
						onClick={() => setMobileNavOpen(false)}
					>
						{link.label}
					</Link>
				))}

				{/* login/logout button */}
				{user ? (
					<HelperTooltip className="group" title={`Odhlásit ${user.displayName}`} onClick={() => signOut(auth)}>
						<Button variant="ghost" className="rounded-full hover:bg-transparent dark:hover:bg-transparent">
							<Image
								className="rounded-full ring ring-transparent transition duration-300 group-hover:ring-accent"
								src={user.photoURL}
								alt={user.displayName}
								width={28}
								height={28}
							/>
						</Button>
					</HelperTooltip>
				) : (
					<HelperTooltip className="group" title={`Přihlásit se`} onClick={() => signInWithPopup(auth, provider)}>
						<Button variant="ghost" className="rounded-full hover:bg-transparent dark:hover:bg-transparent">
							<AccountCircle fontSize="medium" className="text-accent" />
						</Button>
					</HelperTooltip>
				)}
			</nav>
		</section>
	);
};

export default NavBar;
