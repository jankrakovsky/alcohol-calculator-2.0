import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Image from "next/image";
import HelperTooltip from "../../src/components/HelperTooltip";

const DrinkCard = ({drink, setDrink}) => {
    /* total volume of consumed drink */
    const volume = drink.count * drink.volume;

    return (
        <Card
            className="p-2 sm:p-4 min-w-[350px] min-h-[150px] flex flex-row gap-6 text-dark bg-accent-light dark:bg-accent rounded-xl">
            <div>
                <Image
                    className="rounded-xl"
                    src={drink.image}
                    alt={drink.name}
                    width={125}
                    height={125}
                />
            </div>
            <div className="flex flex-col gap-2 justify-between">
                {/* drink description */}
                <div className="flex">
                    <span className="text-lg">{drink.name}</span>
                    <HelperTooltip
                        className="pl-1 text-sm text-gray-700"
                        title="Alkohol v nápoji [%]"
                        text={`${drink.alcoholVolume}%`}
                    />
                </div>

                {/* show drink volume larger than 500 ml in litres */}
                <p>Vypito {volume > 500 ? `${volume / 1000} l` : `${volume} ml`}</p>

                {/* drink count buttons */}
                <div>
                    {/* remove one drink */}
                    <Button
                        className="text-xl text-dark dark:text-light bg-accent dark:bg-accent-dark hover:bg-light dark:hover:bg-dark rounded-lg"
                        onClick={() => setDrink(drink.id, drink.count - 1)}>-</Button>
                    {/* add one more drink */}
                    <span className="pl-2 pr-2">{drink.count}</span>
                    <Button
                        className="p-0 m-0 text-xl text-dark dark:text-light bg-accent dark:bg-accent-dark hover:bg-light dark:hover:bg-dark rounded-lg"
                        onClick={() => setDrink(drink.id, drink.count + 1)}>+</Button>
                </div>
            </div>
        </Card>
    );
}

export default DrinkCard;
