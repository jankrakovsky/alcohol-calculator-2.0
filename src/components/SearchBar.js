import { useState } from 'react';

import allDrinks from '../drinks.json';
import DrinkRow from './DrinkRow';

const SearchBar = () => {
	const [query, setQuery] = useState('');

	/* return all drinks if query is empty, otherwise filters only the ones with match in keywords */
	const filteredDrinks =
		query === '' ? allDrinks : allDrinks.filter((drink) => drink.keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase())));

	return (
		<div className=" relative flex flex-col gap-2 rounded-xl bg-accent-light text-dark dark:bg-accent">
			<input
				className="peer/search h-12 rounded-md border-2 border-solid border-accent px-4 py-2 focus:outline-none dark:bg-dark dark:text-light dark:placeholder-gray-300"
				placeholder="Můžete vesele začít vyhledávat"
				onChange={(event) => setQuery(event.target.value)}
			/>

			<section className="absolute top-[46px] z-10 hidden w-full rounded-b-xl border-2 border-solid border-accent bg-accent-light py-2 hover:block peer-focus/search:block dark:bg-accent-dark">
				{/* show all consumed drinks in DrinkRow component */}
				<div className="max-h-[200px] overflow-scroll px-4">
					{filteredDrinks.length > 0 ? (
						filteredDrinks.map((drink, index) => <DrinkRow drink={drink} key={index} />)
					) : (
						<p className="text-sm text-gray-500 dark:text-gray-300">Žádné nápoje nebyly nalezeny</p>
					)}
				</div>
			</section>
		</div>
	);
};

export default SearchBar;
