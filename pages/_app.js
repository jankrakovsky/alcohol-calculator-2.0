import Head from 'next/head';

import '../styles/globals.css';
import NavBar from '../src/components/NavBar';
import { UserDataProvider } from '../src/hooks/UserDataContext';
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
			<UserDataProvider>
				<NavBar />
			</UserDataProvider>

			{/* main content */}
			<div className="flex max-w-screen-2xl grow justify-center px-4 pb-12 pt-20 transition-all lg:px-12 xl:px-20">
				<Component {...pageProps} />
			</div>

			{/* footer */}
			<footer className="w-full border-t-2 border-solid border-accent-light p-2 text-center dark:border-accent sm:p-4">
				{/* desktop only */}
				<p className="hidden sm:block">Copyright © {currentYear} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
				{/* mobile only */}
				<p className="block text-sm sm:hidden">Copyright © {currentYear}</p>
				<p className="block text-sm sm:hidden">Alkohol kalkulačka - Všechna práva vyhrazena</p>
			</footer>
		</div>
	);
}
