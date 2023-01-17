import {useMemo, useState} from "react";
import dayjs from "dayjs";
import Head from 'next/head'
import DrinkCard from "../../src/components/DrinkCard";
import Search from "../../src/components/Search";
import UserInfo from "../../src/components/UserInfo";
import allDrinks from "../../src/drinks.json";

export default function Kalkulacka() {
    const [consumedDrinks, setConsumedDrinks] = useState([]);
    const [userData, setUserData] = useState({
        gender: "male",
        time: "21:30",
        weight: "",
    });

    const countTimeWhenSober = (totalAlcoholInBody, alcoholPerHour) => {
        const endTime = dayjs(`1970-01-01T${userData.time}:00`);
        const howLongToSober = (totalAlcoholInBody / alcoholPerHour / userData.weight) * 60;
        const whenSober = endTime.add(howLongToSober, "minute");

        return whenSober;
    }

    const countTotalAlcoholInBody = () => {
        const alcoholPerHour = userData.gender === "male" ? 0.1 : 0.085;
        const waterInBody = userData.gender === "male" ? 0.7 : 0.6;

        const totalAlcoholInBody = consumedDrinks.reduce((total, drink) => {
            const totalDrinkVolume = drink.count * drink.volume;
            return total + (totalDrinkVolume * drink.alcoholVolume * 0.8 / 100);
        }, 0);

        const soberTime = countTimeWhenSober(totalAlcoholInBody, alcoholPerHour);
        const perMile = (totalAlcoholInBody) / (userData.weight * waterInBody);

        return {
            soberTime,
            perMile
        }
    }

    /* function that adds or edits selected drink in consumedDrinks array */
    const setDrink = (selectedDrinkId, count = 1) => {
        /* Find the selected drink from all drinks */
        const selectedDrink = allDrinks.find(drink => drink.id === selectedDrinkId);
        /* if the selected drink does not exist, return */
        if (!selectedDrink) return;

        /* check if the selected drink already exists in consumed drinks */
        const existingDrink = consumedDrinks.find(drink => drink.id === selectedDrinkId);
        if (existingDrink) {
            /* if it does, update the count and set consumed drinks */
            const updatedCount = existingDrink.count + count;
            if (updatedCount > 0) {
                setConsumedDrinks(consumedDrinks.map(drink => drink.id === selectedDrinkId ? {...drink, count: updatedCount} : drink));
            } else {
                /* if the updated count is less than or equal to 0, remove the drink from consumed drinks */
                setConsumedDrinks(consumedDrinks.filter(drink => drink.id !== selectedDrinkId));
            }
        } else {
            /* if the selected drink does not exist in consumed drinks, add it with the given count */
            setConsumedDrinks([...consumedDrinks, {...selectedDrink, count}]);
        }
    };


    const result = useMemo(() => countTotalAlcoholInBody(), [userData, consumedDrinks, countTotalAlcoholInBody]);

    return (
        <main className="h-full">
            <Head>
                <title>Kalkulačka | Alkohol kalkulačka</title>
            </Head>

            {/* search and add new drink */}
            <section className="flex flex-col gap-12">
                <article>
                    <h2 className="mb-4 text-2xl font-bold">Uživatelská data</h2>

                    <UserInfo userData={userData} setUserData={setUserData}/>
                </article>

                {result.perMile > 0 && (
                    <article>
                        <h2 className="mb-4 text-2xl font-bold">Výsledek testu</h2>

                        <p>Máte v krvi zhruba {result.perMile} promile alkoholu.</p>
                        <p>Střízliví byste měli být v: {result.soberTime.format("HH:mm")}</p>
                    </article>
                )}

                <article>
                    <h2 className="mb-4 text-2xl font-bold">Přidat nápoj</h2>

                    <Search drinks={allDrinks} setDrink={setDrink}/>
                </article>

                {/* list of drinks you already drank */}
                <article>
                    <h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

                    <span className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {/* show all consumed drinks in DrinkCard component */}
                        {consumedDrinks.map((drink, index) => (
                            <DrinkCard drink={drink} setDrink={setDrink} key={index}/>
                        ))}
                    </span>
                </article>
            </section>
        </main>
    )
}
