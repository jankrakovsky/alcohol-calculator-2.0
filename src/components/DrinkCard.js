import Image from 'next/image';

import Tooltip from './Tooltip';

const DrinkCard = ({ drink, setDrink }) => {
	/* total volume of consumed drink */
	const volume = drink.count * drink.volume;

	return (
		<div className="flex min-h-[150px] min-w-[350px] flex-row gap-6 rounded-xl bg-accent-light p-2 text-dark shadow dark:bg-accent sm:p-4">
			<div className="flex items-center">
				<Image className="rounded-xl" src={drink.image} alt={drink.name} width={50} height={50} />
			</div>
			<div className="flex flex-col justify-between gap-2">
				{/* drink description */}
				<div className="flex">
					<span className="text-lg">{drink.name}</span>
					<Tooltip title="Alkohol v nápoji [%]">
						<span className="pl-1 text-sm text-gray-700">{drink.alcoholVolume}%</span>
					</Tooltip>
				</div>

				{/* show drink volume larger than 500 ml in litres */}
				<p>Vypito {volume > 500 ? `${volume / 1000} l` : `${volume} ml`}</p>

				{/* drink count buttons */}
				<div>
					{/* remove one drink */}
					<button
						className="rounded-lg bg-accent px-4 py-2 text-xl text-dark transition-colors hover:bg-light dark:bg-accent-dark dark:text-light dark:hover:bg-dark"
						onClick={() => setDrink(drink.id, -1)}
					>
						-
					</button>
					{/* add one more drink */}
					<span className="pl-2 pr-2">{drink.count}</span>
					<button
						className="rounded-lg bg-accent px-4 py-2 text-xl text-dark transition-colors hover:bg-light dark:bg-accent-dark dark:text-light dark:hover:bg-dark"
						onClick={() => setDrink(drink.id, 1)}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default DrinkCard;
