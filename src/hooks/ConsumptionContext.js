import { createContext, useCallback, useContext, useState } from 'react';

import allDrinks from '../drinks.json';
import useNow from './useNow';

const ConsumptionContext = createContext();

export const ConsumptionProvider = ({ children }) => {
	const now = useNow();
	const [drinkTime, setDrinkTime] = useState(now);
	const [data, setData] = useState([]);

	/* function that adds or edits selected drink in data array */
	const setDrink = useCallback(
		(selectedDrinkId, count = 1) => {
			/* Find the selected drink from all drinks */
			const selectedDrink = allDrinks.find((drink) => drink.id === selectedDrinkId);
			/* if the selected drink does not exist, return */
			if (!selectedDrink) return;

			/* check if the selected drink already exists in consumed drinks */
			const existingDrink = data.find((drink) => drink.id === selectedDrinkId);
			if (existingDrink) {
				/* if it does, update the count and set consumed drinks */
				const updatedCount = existingDrink.count + count;
				if (updatedCount > 0) {
					setData(
						data.map((drink) =>
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
					setData(data.filter((drink) => drink.id !== selectedDrinkId));
				}
			} else {
				/* if the selected drink does not exist in consumed drinks, add it with the given count */
				setData([...data, { ...selectedDrink, count }]);
			}
		},
		[data],
	);

	const value = { data, setData, setDrink, drinkTime, setDrinkTime };

	return <ConsumptionContext.Provider value={value}>{children}</ConsumptionContext.Provider>;
};

export const useConsumptionContext = () => useContext(ConsumptionContext);
