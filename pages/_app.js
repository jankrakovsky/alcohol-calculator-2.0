import Head from "next/head";
import '../styles/globals.css';
import { useState, useEffect } from "react";
import Navigation from "../src/components/Navigation";

export default function MyApp({ Component, pageProps }) {
	/* current year to display in footer */
	const currentYear = new Date().getFullYear();

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
		/* same for all pages */
		<div className="h-full flex flex-col dark:text-gray-200 bg-light dark:bg-dark">
			{/* header */}
			<Head>
				<title>Alkohol kalkulačka</title>
				<meta name="description" content="Webová alkohol kalkulačka s chytrými funkcemi." />

				<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
				<link rel="manifest" href="/icon/site.webmanifest" />
			</Head>

			<Navigation mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />

			{/* main content */}
			<div className={`mt-12 p-4 pb-20 lg:px-12 xl:px-20 grow dark:bg-dark transition-all ${mobileNavOpen && "blur"}`}>
				<Component {...pageProps} />
			</div>

			{/* footer */}
			<footer className={`p-4 w-full fixed bottom-0 text-dark dark:text-light bg-light dark:bg-dark border-t-2 border-solid border-accent-light dark:border-accent text-center ${mobileNavOpen && "blur"}`}>
				<p>Copyright © {currentYear} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
			</footer>
		</div >
	);
}