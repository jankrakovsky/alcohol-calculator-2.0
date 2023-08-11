import Head from 'next/head';

import DrinkCard from '../../src/components/DrinkCard';
import Result from '../../src/components/Result';
import SearchBar from '../../src/components/SearchBar';
import Tabs from '../../src/components/Tabs';
import UserInfo from '../../src/components/UserInfo';
import { useConsumptionContext } from '../../src/hooks/ConsumptionContext';
import { UserDataProvider, useUserDataContext } from '../../src/hooks/UserDataContext';
import useNow from '../../src/hooks/useNow';

export default function Kalkulacka() {
	const now = useNow();
	/* TODO: Remove after user data popup creation */
	const { loading } = useUserDataContext();
	/* TODO: Move with drink list to separate component */
	const { data: consumedDrinks } = useConsumptionContext();

	return (
		<main className="h-full w-full max-w-[800px]">
			<Head>
				<title>Kalkulačka | Alkohol kalkulačka</title>
			</Head>

			{/* search and add new drink */}
			<section className="flex flex-col gap-12">
				<Tabs
					tabs={[
						{
							title: 'Výsledek testu',
							value: () => (
								<UserDataProvider>
									<Result />
								</UserDataProvider>
							),
						},
						{
							title: 'O Vás',
							value: () => (
								<article>
									<h2 className="mb-4 text-2xl font-bold">Uživatelská data</h2>

									{!loading ? <UserInfo /> : <p>Načítám</p>}
								</article>
							),
						},
					]}
				/>

				<article>
					<h2 className="mb-4 text-2xl font-bold">Přidat nápoj</h2>

					<SearchBar />
				</article>

				{/* list of drinks you already drank (if any) */}
				{consumedDrinks.length > 0 && (
					<article>
						<h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

						<span className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
							{/* show all consumed drinks in DrinkCard component */}
							{consumedDrinks.map((drink, index) => (
								<DrinkCard drink={drink} key={index} />
							))}
						</span>
					</article>
				)}
			</section>
		</main>
	);
}
