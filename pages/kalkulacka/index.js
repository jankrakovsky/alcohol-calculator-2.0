import Head from 'next/head';

import ConsumedList from '../../src/components/ConsumedList';
import Result from '../../src/components/Result';
import SearchBar from '../../src/components/SearchBar';
import { ConsumptionProvider } from '../../src/hooks/ConsumptionContext';
import { UserDataProvider } from '../../src/hooks/UserDataContext';

export default function Kalkulacka() {
	return (
		<main className="h-full w-full max-w-[800px]">
			<Head>
				<title>Kalkulačka | Alkohol kalkulačka</title>
			</Head>

			<ConsumptionProvider>
				<section className="flex flex-col gap-12">
					<UserDataProvider>
						<Result />
					</UserDataProvider>

					<article>
						<h2 className="mb-4 text-2xl font-bold">Přidat nápoj</h2>
						<SearchBar />
					</article>

					<ConsumedList />
				</section>
			</ConsumptionProvider>
		</main>
	);
}
