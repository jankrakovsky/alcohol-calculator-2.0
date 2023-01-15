import { useState } from "react";
import Head from 'next/head'
import DrinkCard from "../../src/components/DrinkCard";

export default function Kalkulacka() {
    /* TODO: temp placement of drinks array of object instead of getting them from Firebase */
    const drinkList = [
        {
            "id": "beer10small",
            "name": "Malé pivo 10°",
            "keywords": [
                "pivo",
                "pivko",
                "desítka"
            ],
            "volume": 300,
            "alcoholVolume": 4
        },
        {
            "id": "beer11small",
            "name": "Malé pivo 11°",
            "keywords": [
                "pivo",
                "pivko",
                "jedenáctka"
            ],
            "volume": 300,
            "alcoholVolume": 4.5
        },
        {
            "id": "beer12small",
            "name": "Malé pivo 12°",
            "keywords": [
                "pivo",
                "pivko",
                "dvanáctka"
            ],
            "volume": 300,
            "alcoholVolume": 5
        },
        {
            "id": "beer10",
            "name": "Pivo 10°",
            "keywords": [
                "pivo",
                "pivko",
                "desítka"
            ],
            "volume": 500,
            "alcoholVolume": 4
        },
        {
            "id": "beer11",
            "name": "Pivo 11°",
            "keywords": [
                "pivo",
                "pivko",
                "jedenáctka"
            ],
            "volume": 500,
            "alcoholVolume": 4.5
        },
        {
            "id": "beer12",
            "name": "Pivo 12°",
            "keywords": [
                "pivo",
                "pivko",
                "dvanáctka"
            ],
            "volume": 500,
            "alcoholVolume": 5
        },
        {
            "id": "wine",
            "name": "Víno",
            "keywords": [
                "víno",
                "vínko",
                "vínečko"
            ],
            "volume": 500,
            "alcoholVolume": 15
        },
        {
            "id": "vodka",
            "name": "Vodka",
            "keywords": [
                "vodka",
                "42",
                "Absolut",
                "Amundsen vodka",
                "Beluga vodka",
                "Belvedere vodka",
                "Bismarck vodka",
                "Bols vodka",
                "Boris vodka",
                "Božkov vodka",
                "Cîroc",
                "Danzka vodka"
            ],
            "volume": 20,
            "alcoholVolume": 42
        },
        {
            "id": "peppermint",
            "name": "Peppermint",
            "keywords": [
                "zelena",
                "ustní voda"
            ],
            "volume": 20,
            "alcoholVolume": 19
        },
        {
            "id": "bozkovOriginal",
            "name": "Božkov Original 37,5%",
            "keywords": [
                "run",
                "cola"
            ],
            "volume": 20,
            "alcoholVolume": 37.5
        },
        {
            "id": "malibu",
            "name": "Malibu",
            "keywords": [
                "rum",
                "cola"
            ],
            "volume": 20,
            "alcoholVolume": 21
        },
        {
            "id": "becherovkaOriginal",
            "name": "Becherovka Original",
            "keywords": [
                "becher",
                "becherovka",
                "bylinky"
            ],
            "volume": 20,
            "alcoholVolume": 38
        },
        {
            "id": "martini",
            "name": "Martini",
            "keywords": [
                "gin",
                "vermouth",
                "koktejl"
            ],
            "volume": 20,
            "alcoholVolume": 15
        },
        {
            "id": "beefeaterGin",
            "name": "Beefeater Gin",
            "keywords": [
                "gin",
                "tonik",
                "koktejl"
            ],
            "volume": 20,
            "alcoholVolume": 40
        },
        {
            "id": "fernetStockOriginal",
            "name": "Fernet Stock Original",
            "keywords": [
                "fernet",
                "stock",
                "bylinky"
            ],
            "volume": 20,
            "alcoholVolume": 38
        },
        {
            "id": "grantsWhiskey",
            "name": "Grant's Whiskey",
            "keywords": [
                "whiskey",
                "grantska"
            ],
            "volume": 20,
            "alcoholVolume": 40
        },
        {
            "id": "metaxa5*",
            "name": "Metaxa 5*",
            "keywords": [
                "metaxa",
                "whiskey",
                "5"
            ],
            "volume": 20,
            "alcoholVolume": 38
        },
        {
            "id": "metaxa7*",
            "name": "Metaxa 7*",
            "keywords": [
                "metaxa",
                "whiskey",
                "7"
            ],
            "volume": 20,
            "alcoholVolume": 40
        },
        {
            "id": "metaxa12*",
            "name": "Metaxa 12*",
            "keywords": [
                "metaxa",
                "whiskey",
                "12"
            ],
            "volume": 20,
            "alcoholVolume": 40
        },
        {
            "id": "jagermeister",
            "name": "Jägermeister",
            "keywords": [
                "Jager",
                "bylinky"
            ],
            "volume": 20,
            "alcoholVolume": 35
        },
        {
            "id": "baileysChocolatLuxe",
            "name": "Baileys Chocolat Luxe",
            "keywords": [
                "Baileys",
                "čokoláda",
                "sladké"
            ],
            "volume": 100,
            "alcoholVolume": 15
        },
        {
            "id": "artSpritz",
            "name": "ArtSpritz",
            "keywords": [
                "Aperol",
                "koktejl",
                "ovoce"
            ],
            "volume": 100,
            "alcoholVolume": 11
        },
        {
            "id": "bombardino",
            "name": "Bombardino",
            "keywords": [
                "Bombardino",
                "koktejl"
            ],
            "volume": 100,
            "alcoholVolume": 16
        },
        {
            "id": "cointreau",
            "name": "Cointreau",
            "keywords": [
                "koktejl"
            ],
            "volume": 20,
            "alcoholVolume": 40
        },
        {
            "id": "mead",
            "name": "Mead",
            "keywords": [
                "koktejl"
            ],
            "volume": 100,
            "alcoholVolume": 12
        }
    ];

    /* TODO: temp adding dummy image to drink instead of getting drink image from Firebase */
    const drinkOptions = drinkList.map(drink => ({
        ...drink,
        image: 'https://muzonov.net/uploads/posts/2020-01/1578864486_darude-sandstorm.jpg'
    }));

    /* TODO: mock data included for testing purposes */
    const [consumedDrinks, setConsumedDrinks] = useState([
        {
            ...drinkOptions.find(drink => drink.id === "beer10small"),
            count: 7,
        },
        {
            ...drinkOptions.find(drink => drink.id === "vodka"),
            count: 4,
        },
        {
            ...drinkOptions.find(drink => drink.id === "peppermint"),
            count: 10,
        },
    ]);

    /* function that edits selected drink in consumed drinks array */
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

    return (
        <main className="h-full">
            <Head>
                <title>Kalkulačka | Alkohol kalkulačka</title>
            </Head>

            <section className="flex flex-col">
                <h2 className="mb-4 text-2xl font-bold">Vypité nápoje</h2>

                <span className="flex flex-row flex-wrap gap-4">
                    {/* show all consumed drinks in DrinkCard component */}
                    {consumedDrinks.map((drink, index) => (
                        <DrinkCard drink={drink} setDrink={setDrink} key={index} />
                    ))}
                </span>
            </section>
        </main>
    )
}
