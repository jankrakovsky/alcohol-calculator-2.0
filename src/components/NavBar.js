import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import debounce from 'lodash/debounce';

import UserDataDialog from './UserDataDialog';

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

	/* open/close mobile burger menu */
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	/* check the screen size */
	const handleResize = useCallback(
		debounce(() => {
			if (window.innerWidth > 640) setMobileNavOpen(false);
		}, 100),
		[],
	);

	/*  add event listener and remove it on cleanup */
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return (
		/* navbar wrapper that centers navbar content */
		<section
			className={`fixed left-0 top-0 w-full transition-all sm:static sm:flex sm:justify-center ${
				mobileNavOpen && 'z-20 bg-accent-light/25 backdrop-blur dark:bg-accent-dark/25'
			}`}
		>
			{mobileNavOpen ? (
				/* close navigation button for mobile */
				<button
					className="fixed right-0 top-0 p-6 text-accent transition-colors hover:bg-transparent hover:text-accent-dark dark:hover:text-accent-light"
					onClick={() => setMobileNavOpen(false)}
				>
					<CloseRounded />
				</button>
			) : (
				/* open navigation button for mobile */
				<button
					className="fixed right-0 top-0 rounded-bl-lg p-6 text-accent transition-colors hover:bg-light hover:text-accent-dark hover:dark:bg-dark dark:hover:text-accent-light sm:hidden"
					onClick={() => setMobileNavOpen(true)}
				>
					<MenuRounded />
				</button>
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

				<UserDataDialog />
			</nav>
		</section>
	);
};

export default NavBar;
