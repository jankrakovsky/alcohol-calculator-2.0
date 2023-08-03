import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { addMinutes, format } from 'date-fns';

import DrinkCard from '../../src/components/DrinkCard';
import SearchBar from '../../src/components/SearchBar';
import UserInfo from '../../src/components/UserInfo';
import allDrinks from '../../src/drinks.json';
import useNow from '../../src/hooks/useNow';
import useUserSettings from '../../src/hooks/useUserSettings';

export default function Kalkulacka() {
	const now = useNow();
	const { data, loading, errorCode } = useUserSettings();

	const [consumedDrinks, setConsumedDrinks] = useState([]);
	const [userData, setUserData] = useState({ time: now });

	const countTimeWhenSober = useCallback(
		(totalAlcoholInBody, alcoholPerHour) => {
			if (userData.time) {
				const endTime = new Date(userData.time);
				const howLongToSober = (totalAlcoholInBody / alcoholPerHour / userData.weight) * 60;
				const whenSober = addMinutes(endTime, howLongToSober);

				return whenSober;
			}
			return now;
		},
		[now, userData.time, userData.weight],
	);

	const countTotalAlcoholInBody = useCallback(() => {
		const alcoholPerHour = userData.gender === 'male' ? 0.1 : 0.085;
		const waterInBody = userData.gender === 'male' ? 0.7 : 0.6;

		const totalAlcoholInBody = consumedDrinks.reduce((total, drink) => {
			const totalDrinkVolume = drink.count * drink.volume;
			return total + (totalDrinkVolume * drink.alcoholVolume * 0.8) / 100;
		}, 0);

		const soberTime = countTimeWhenSober(totalAlcoholInBody, alcoholPerHour);
		const perMile = totalAlcoholInBody / (userData.weight * waterInBody);

		return {
			soberTime,
			perMile,
		};
	}, [consumedDrinks, userData, countTimeWhenSober]);

	/* function that adds or edits selected drink in consumedDrinks array */
	const setDrink = useCallback(
		(selectedDrinkId, count = 1) => {
			/* Find the selected drink from all drinks */
			const selectedDrink = allDrinks.find((drink) => drink.id === selectedDrinkId);
			/* if the selected drink does not exist, return */
			if (!selectedDrink) return;

			/* check if the selected drink already exists in consumed drinks */
			const existingDrink = consumedDrinks.find((drink) => drink.id === selectedDrinkId);
			if (existingDrink) {
				/* if it does, update the count and set consumed drinks */
				const updatedCount = existingDrink.count + count;
				if (updatedCount > 0) {
					setConsumedDrinks(
						consumedDrinks.map((drink) =>
							drink.id === selectedDrinkId
								? {
										...drink,
										count: updatedCount,
								  }
								: drink,
						),
					);
				} else {
					/* if the updated count is less than or equal to 0, remove the drink from consumed drinks */
					setConsumedDrinks(consumedDrinks.filter((drink) => drink.id !== selectedDrinkId));
				}
			} else {
				/* if the selected drink does not exist in consumed drinks, add it with the given count */
				setConsumedDrinks([...consumedDrinks, { ...selectedDrink, count }]);
			}
		},
		[consumedDrinks],
	);

	const { soberTime, perMile } = useMemo(() => countTotalAlcoholInBody(), [countTotalAlcoholInBody]);

	return (
		<main className="h-full">
			<Head>
				<title>Kalkulačka | Alkohol kalkulačka</title>
			</Head>

			{/* search and add new drink */}
			<section className="flex flex-col gap-12">
				<article>
					<h2 className="mb-4 text-2xl font-bold">Uživatelská data</h2>

					{!loading ? <UserInfo userData={data} /> : <p>Načítám</p>}
				</article>

				{perMile > 0 && (
					<article>
						<h2 className="mb-4 text-2xl font-bold">Výsledek testu</h2>

						<p>
							Máte v krvi zhruba <span className="text-accent">{perMile.toFixed(2)}</span> promile alkoholu.
						</p>
						{perMile < 3 ? (
							<p>
								Střízliví byste měli být v: <span className="text-accent">{format(soberTime, 'HH:mm')}</span>
							</p>
						) : (
							<p>
								Při této hodnotě již bohužel nedokážeme dostatečně přesně odhadnout čas vašeho vystřízlivění. Můžeme jedině doporučit
								odpočinout následující den odpočívat bez řízení.
							</p>
						)}
					</article>
				)}

				<article>
					<h2 className="mb-4 text-2xl font-bold">Přidat nápoj</h2>

					<SearchBar drinks={allDrinks} setDrink={setDrink} />
				</article>

				{/* list of drinks you already drank (if any) */}
				{consumedDrinks.length > 0 && (
					<article>
						<h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

						<span className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
							{/* show all consumed drinks in DrinkCard component */}
							{consumedDrinks.map((drink, index) => (
								<DrinkCard drink={drink} setDrink={setDrink} key={index} />
							))}
						</span>
					</article>
				)}
			</section>
		</main>
	);
}
