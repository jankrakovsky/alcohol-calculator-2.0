import Button from '@mui/material/Button';
import Image from "next/image";
import HelperTooltip from "../../src/components/HelperTooltip";

const DrinkRow = ({ drink, setDrink }) => {
    return (
        <div className="h-[50px] flex flex-row justify-between gap-6 dark:text-light border-b-[1px] border-gray-600/20 border-solid">
            <div className="flex items-center gap-4">
                <div className="flex items-center">
                    <Image
                        src={drink.image}
                        alt={drink.name}
                        width={20}
                        height={20}
                    />
                </div>

                {/* drink description */}
                <p>
                    <span>{drink.name}</span>
                    <HelperTooltip
                        className="pl-1 text-sm text-gray-700 dark:text-gray-300"
                        title="Alkohol v nápoji [%]"
                        text={`${drink.alcoholVolume}%`}
                    />
                </p>
            </div>

            <div className="flex items-center gap-2">
                {/* show drink volume larger than 500 ml in litres */}
                <p>{drink.volume > 500 ? `${drink.volume / 1000} l` : `${drink.volume} ml`}</p>

                {/* add drink */}
                <Button
                    className="text-xl text-dark dark:text-light bg-accent/50 hover:bg-light/50 dark:hover:bg-dark/50 rounded-lg"
                    onClick={() => setDrink(drink.id)}>+</Button>
            </div>
        </div>
    );
}

export default DrinkRow;
