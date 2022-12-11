import Head from "next/head";
import Link from "next/link";
import '../styles/globals.css'

const now = new Date();
const links = [
  {
    href: "/",
    label: "Alkohol kalkulačka",
  },
  {
    href: "/kalkulacka",
    label: "Kalkulačka",
  },
  {
    href: "/vzorec",
    label: "Vzorec",
  },
  {
    href: "/o-projektu",
    label: "O projektu",
  },
];

export default function MyApp({ Component, pageProps }) {
  return (
    /* same for all pages */
    <div className="h-full flex flex-col">
      {/* header */}
      <Head>
        <title>Alkohol kalkulačka</title>
        <meta name="description" content="Webová alkohol kalkulačka s chytrými funkcemi." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* navbar wrapper with gradient bg */}
      <div className="flex justify-center bg-gradient-to-t from-light to-accent-light">
        {/* navbar with Link items for each page in pages */}
        <nav className="p-6 pb-4 flex flex-col justify-center sm:flex-row text-dark gap-y-3 gap-x-12 text-center border-b-2 border-solid border-accent-light">
          {links.map((link, i) => (
            <Link className="hover:text-accent border-solid border-b-2 border-transparent hover:border-accent transition-all duration-300" key={i} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>

      {/* main content */}
      <div className="m-4 grow">
        <Component {...pageProps} />
      </div>

      {/* footer */}
      <footer className="p-4 w-full fixed bottom-0 bg-gradient-to-b from-light to-accent-light text-dark border-t-2 border-solid border-accent-light text-center">
        <p>Copyright © {now.getFullYear()} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
      </footer>
    </div>

  );
}