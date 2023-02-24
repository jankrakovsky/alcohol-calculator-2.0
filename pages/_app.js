import Head from "next/head";
import '../styles/globals.css';
import Navigation from "../src/components/Navigation";
import {StyledEngineProvider} from "@mui/material";

export default function MyApp({Component, pageProps}) {
    /* current year to display in footer */
    const currentYear = new Date().getFullYear();

    return (
        <StyledEngineProvider injectFirst>
            {/* same for all pages */}
            <div className="h-full flex flex-col">
                {/* header */}
                <Head>
                    <title>Alkohol kalkulačka</title>
                    <meta name="description" content="Webová alkohol kalkulačka s chytrými funkcemi."/>

                    <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png"/>
                    <link rel="manifest" href="/icon/site.webmanifest"/>
                </Head>

                <Navigation/>

                {/* main content */}
                <div className="px-4 lg:px-12 xl:px-20 pt-20 pb-12 grow transition-all mx-auto max-w-screen-2xl">
                    <Component {...pageProps} />
                </div>

                {/* footer */}
                <footer
                    className="p-4 w-full border-t-2 border-solid border-accent-light dark:border-accent text-center">
                    <p>Copyright © {currentYear} | Alkohol kalkulačka - Všechna práva vyhrazena</p>
                </footer>
            </div>
        </StyledEngineProvider>
    );
}