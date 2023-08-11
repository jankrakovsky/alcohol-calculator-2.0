import { useCallback, useMemo } from 'react';
import { addMinutes, format } from 'date-fns';

import { useConsumptionContext } from '../hooks/ConsumptionContext';
import { useUserDataContext } from '../hooks/UserDataContext';
import useNow from '../hooks/useNow';

const Result = () => {
	const now = useNow();
	const { data, loading } = useUserDataContext();
	const { data: drinkData, drinkTime } = useConsumptionContext();
	const countTimeWhenSober = useCallback(
		(totalAlcoholInBody, alcoholPerHour) => {
			if (drinkTime && !loading) {
				const endTime = new Date(drinkTime);
				const howLongToSober = (totalAlcoholInBody / alcoholPerHour / data.weight) * 60;
				const whenSober = addMinutes(endTime, howLongToSober);

				return whenSober;
			}
			return now;
		},
		[drinkTime, loading, now, data.weight],
	);

	const countTotalAlcoholInBody = useCallback(() => {
		const alcoholPerHour = data?.gender === 'male' ? 0.1 : 0.085;
		const waterInBody = data?.gender === 'male' ? 0.7 : 0.6;

		const totalAlcoholInBody = drinkData.reduce((total, drink) => {
			const totalDrinkVolume = drink.count * drink.volume;
			return total + (totalDrinkVolume * drink.alcoholVolume * 0.8) / 100;
		}, 0);

		const soberTime = countTimeWhenSober(totalAlcoholInBody, alcoholPerHour);
		const perMile = totalAlcoholInBody / (data?.weight * waterInBody);

		return {
			soberTime,
			perMile,
		};
	}, [drinkData, data, countTimeWhenSober]);

	const { soberTime, perMile } = useMemo(() => countTotalAlcoholInBody(), [countTotalAlcoholInBody]);

	return (
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
					Při této hodnotě již bohužel nedokážeme dostatečně přesně odhadnout čas vašeho vystřízlivění. Můžeme jedině doporučit odpočinout
					následující den odpočívat bez řízení.
				</p>
			)}
		</article>
	);
};

export default Result;
