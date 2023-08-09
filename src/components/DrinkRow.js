import Image from 'next/image';

import Tooltip from '../../src/components/Tooltip';

const DrinkRow = ({ drink, setDrink }) => {
	return (
		<div className="flex h-[50px] flex-row justify-between gap-6 border-b-[1px] border-solid border-gray-600/20 dark:text-light">
			<div className="flex items-center gap-4">
				<div className="flex items-center">
					<Image src={drink.image} alt={drink.name} width={20} height={20} />
				</div>

				{/* drink description */}
				<p>
					<span>{drink.name}</span>
					<Tooltip title="Alkohol v nápoji [%]">
						<span className="pl-1 text-sm text-gray-700 dark:text-gray-300">{drink.alcoholVolume}%</span>
					</Tooltip>
				</p>
			</div>

			<div className="flex items-center gap-2">
				{/* show drink volume larger than 500 ml in litres */}
				<p>{drink.volume > 500 ? `${drink.volume / 1000} l` : `${drink.volume} ml`}</p>

				{/* add drink */}
				<button
					className="rounded-lg bg-accent/50 px-4 py-2 text-xl text-dark transition-colors hover:bg-light/50 dark:text-light dark:hover:bg-dark/50"
					onClick={() => setDrink(drink.id)}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default DrinkRow;
