import { useState } from "react";
import Head from 'next/head'
import DrinkCard from "../../src/components/DrinkCard";
import Search from "../../src/components/Search";
import allDrinks from "../../src/drinks.json";

export default function Kalkulacka() {
    const [consumedDrinks, setConsumedDrinks] = useState([]);

    /* function that edits selected drink in consumedDrinks array */
    const setDrink = (selectedDrinkId, count) => {
        setConsumedDrinks(consumedDrinks.map((drink) => {
            if (drink.id === selectedDrinkId) {
                drink.count = count;
                if (drink.count <= 0) {
                    drink.count = 0;
                }
            }
            return drink;
        }).filter(drink => drink.count > 0));
    }

    /* function that adds new drink in consumedDrinks array */
    const addDrink = (selectedDrinkId) => {
        console.log("adding ", selectedDrinkId)
        /* find selected drink by ID in array of drinks */
        const newDrink = allDrinks.find(drink => drink.id === selectedDrinkId);

        /* if found, add to consumedDrinks state */
        if (newDrink !== undefined) setConsumedDrinks([...consumedDrinks, { ...newDrink, count: 1 }]);
    }

    return (
        <main className="h-full">
            <Head>
                <title>Kalkulačka | Alkohol kalkulačka</title>
            </Head>

            {/* search and add new drink */}
            <section className="flex flex-col gap-[220px]">
                <article>
                    <h2 className="mb-4 text-2xl font-bold">Přidat nápoj</h2>

                    <Search drinks={allDrinks} addDrink={addDrink} />
                </article>

                {/* list of drinks you already drank */}
                <article>
                    <h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

                    <span className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {/* show all consumed drinks in DrinkCard component */}
                        {consumedDrinks.map((drink, index) => (
                            <DrinkCard drink={drink} setDrink={setDrink} key={index} />
                        ))}
                    </span>
                </article>
            </section>
        </main>
    )
}
