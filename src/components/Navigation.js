import { useState, useEffect } from "react";
import Link from "next/link";
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Navigation = () => {
	/* links for navbar */
	const links = [
		{
			href: "/",
			label: "Úvod",
		},
		{
			href: "/kalkulacka",
			label: "Kalkulačka",
		},
		{
			href: "/o-projektu",
			label: "O projektu",
		},
	];

	/* open/close mobile burger menu */
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	/* choose the screen size */
	const handleResize = () => {
		if (window.innerWidth > 640) {
			setMobileNavOpen(false)
		}
	}

	// create an event listener
	useEffect(() => {
		window.addEventListener("resize", handleResize)
	})

	return (
		/* navbar wrapper that centers navbar content */
		<section className={`w-full h-full sm:h-auto fixed sm:static left-0 top-0 sm:flex sm:justify-center ${mobileNavOpen && "bg-accent-light/25 dark:bg-accent-dark/25 backdrop-blur"}`}>
			{mobileNavOpen ? (
				/* close navigation button for mobile */
				<Button className="fixed right-0 top-0 p-6 text-accent hover:text-accent-dark dark:hover:text-accent-light hover:bg-transparent" onClick={() => setMobileNavOpen(false)}>
					<CloseRoundedIcon />
				</Button>
			) : (
				/* open navigation button for mobile */
				<Button className="sm:hidden fixed right-0 top-0 p-6 text-accent hover:text-accent-dark dark:hover:text-accent-light hover:bg-light hover:dark:bg-dark rounded-bl-lg" onClick={() => setMobileNavOpen(true)}>
					<MenuRoundedIcon />
				</Button>
			)}

			{/* navbar */}
			<nav className={`p-6 pb-4 h-full sm:h-auto ${mobileNavOpen ? "flex" : "hidden"} sm:flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-x-12 border-b-2 border-solid border-transparent sm:border-accent-light sm:dark:border-accent-dark`}>
				{/* array map links */}
				{links.map((link, i) => (
					<Link className="dark:text-light hover:text-accent text-xl sm:text-base border-solid border-b-2 border-transparent hover:border-accent transition-colors duration-300" key={i} href={link.href} onClick={() => setMobileNavOpen(false)}>{link.label}</Link>
				))}
			</nav>
		</section>
	);
}

export default Navigation;
