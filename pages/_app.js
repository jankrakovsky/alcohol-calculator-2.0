import Head from "next/head";
import Link from "next/link";
import '../styles/globals.css'

/* current year to display in footer */
const currentYear = new Date().getFullYear();
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

export default function MyApp({ Component, pageProps }) {
	return (
		/* same for all pages */
		<div className="h-full flex flex-col dark:text-gray-200 dark:bg-dark">
			{/* header */}
			<Head>
				<title>Alkohol kalkulačka</title>
				<meta name="description" content="Webová alkohol kalkulačka s chytrými funkcemi." />

				<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
				<link rel="manifest" href="/icon/site.webmanifest" />
			</Head>

			{/* navbar wrapper that centers navbar content */}
			<div className="flex justify-center dark:bg-dark">
				{/* navbar with Link items for each page in pages */}
				<nav className="p-6 pb-4 flex flex-col justify-center sm:flex-row text-dark text-center gap-y-3 gap-x-12 border-b-2 border-solid border-accent-light dark:border-accent-dark">
					{links.map((link, i) => (
						<Link className="dark:text-light hover:text-accent border-solid border-b-2 border-transparent hover:border-accent transition-all duration-300" key={i} href={link.href}>{link.label}</Link>
					))}
				</nav>
			</div>

			{/* main content */}
			<div className="mt-12 p-4 pb-20 lg:px-12 xl:px-20 grow dark:bg-dark transition-all">
				<Component {...pageProps} />
			</div>

			{/* footer */}
			<footer className="p-4 w-full fixed bottom-0 text-dark dark:text-light bg-light dark:bg-dark border-t-2 border-solid border-accent-light dark:border-accent text-center">
				<p>Copyright © {currentYear} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
			</footer>
		</div>
	);
}