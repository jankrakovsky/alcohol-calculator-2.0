import Head from 'next/head';

import '../styles/globals.css';
import NavBar from '../src/components/NavBar';
import useNow from '../src/hooks/useNow';

export default function MyApp({ Component, pageProps }) {
	/* current year to display in footer */
	const currentYear = useNow().getFullYear();

	return (
		/* same for all pages */
		<div className="flex h-full flex-col">
			<Head>
				<title>Alkohol kalkulačka</title>
				<meta name="description" content="Webová alkohol kalkulačka s chytrými funkcemi." />

				<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
				<link rel="manifest" href="/icon/site.webmanifest" />
			</Head>

			{/* header */}
			<NavBar />

			{/* main content */}
			<div className="mx-auto max-w-screen-2xl grow px-4 pb-12 pt-20 transition-all lg:px-12 xl:px-20">
				<Component {...pageProps} />
			</div>

			{/* footer */}
			<footer className="w-full border-t-2 border-solid border-accent-light p-4 text-center dark:border-accent">
				<p>Copyright © {currentYear} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
			</footer>
		</div>
	);
}
