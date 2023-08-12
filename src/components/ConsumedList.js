import { useConsumptionContext } from '../hooks/ConsumptionContext';
import DrinkCard from './DrinkCard';

const Result = () => {
	const { data } = useConsumptionContext();

	return (
		<div>
			{/* list of drinks you already drank (if any) */}
			{data.length > 0 && (
				<article>
					<h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

					<span className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
						{/* show all consumed drinks in DrinkCard component */}
						{data.map((drink, index) => (
							<DrinkCard drink={drink} key={index} />
						))}
					</span>
				</article>
			)}
		</div>
	);
};

export default Result;
