import { useCallback, useMemo } from 'react';
import { addMinutes, format } from 'date-fns';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';
import { useConsumptionContext } from '../hooks/ConsumptionContext';
import { useUserDataContext } from '../hooks/UserDataContext';
import useNow from '../hooks/useNow';

const Result = () => {
	const now = useNow();
	const { data, loading } = useUserDataContext();
	const { data: drinkData, drinkTime, setDrinkTime } = useConsumptionContext();
	const countTimeWhenSober = useCallback(
		(totalAlcoholInBody, alcoholPerHour) => {
			if (data && drinkTime && !loading) {
				const endTime = new Date(drinkTime);
				const howLongToSober = (totalAlcoholInBody / alcoholPerHour / data.weight) * 60;
				const whenSober = addMinutes(endTime, howLongToSober);

				return whenSober;
			}
			return now;
		},
		[drinkTime, loading, now, data],
	);

	const countTotalAlcoholInBody = useCallback(() => {
		if (data) {
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
		}
	}, [drinkData, data, countTimeWhenSober]);

	const result = useMemo(() => (data ? countTotalAlcoholInBody() : null), [countTotalAlcoholInBody]);

	return data ? (
		<article>
			{/* drinking end time input */}
			<article className="flex w-80 flex-col justify-between gap-2 rounded-md bg-accent-light p-2 dark:bg-accent">
				<label className="dark:text-dark">Kdy jste skončili s konzumací alkoholu?</label>
				<TimePicker
					className="w-28"
					popupClassName="bg-red-500"
					popupStyle={{ backgroundColor: 'red' }}
					showSecond={false}
					minuteStep={15}
					allowEmpty={false}
					onChange={(val) => {
						setDrinkTime(val ? val.toDate() : now);
					}}
					value={moment(drinkTime)}
				/>
			</article>
			<h2 className="mb-4 text-2xl font-bold">Výsledek testu</h2>

			<p>
				Máte v krvi zhruba <span className="text-accent">{result.perMile.toFixed(2)}</span> promile alkoholu.
			</p>
			{result.perMile < 3 ? (
				<p>
					Střízliví byste měli být v: <span className="text-accent">{format(result.soberTime, 'HH:mm')}</span>
				</p>
			) : (
				<p>
					Při této hodnotě již bohužel nedokážeme dostatečně přesně odhadnout čas vašeho vystřízlivění. Můžeme jedině doporučit odpočinout
					následující den odpočívat bez řízení.
				</p>
			)}
		</article>
	) : (
		<article>
			<h2 className="mb-4 text-2xl font-bold">Výsledek testu</h2>
			<p>Pro výpočet výsledku je potřeba vyplnit všechny údaje výše.</p>
		</article>
	);
};

export default Result;
