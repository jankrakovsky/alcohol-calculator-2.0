import {useState} from "react";
import DrinkRow from "./DrinkRow";

const Search = ({drinks, setDrink}) => {
    const [query, setQuery] = useState("");

    /* return all drinks if query is empty, otherwise filters only the ones with match in keywords */
    const filteredDrinks = query === "" ? drinks : drinks.filter((drink) => drink.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())));

    return (
        <div className=" relative flex flex-col gap-2 text-dark bg-accent-light dark:bg-accent rounded-xl">
            <input
                className="peer/search px-4 py-2 h-12 dark:text-light dark:bg-dark dark:placeholder-gray-300 focus:outline-none border-2 border-accent border-solid rounded-md"
                placeholder="Můžete vesele začít vyhledávat" onChange={event => setQuery(event.target.value)}/>

            <section
                className="hidden peer-focus/search:block hover:block absolute z-10 top-[46px] py-2 w-full bg-accent-light dark:bg-accent-dark rounded-b-xl border-2 border-accent border-solid"
            >
                {/* show all consumed drinks in DrinkRow component */}
                <div className="px-4 max-h-[200px] overflow-scroll">
                    {filteredDrinks.length > 0 ? filteredDrinks.map((drink, index) => (
                    <DrinkRow drink={drink} setDrink={setDrink} key={index} />
                    )) : <p className="text-sm text-gray-500 dark:text-gray-300">Žádné nápoje nebyly nalezeny</p>}
                </div>
            </section>
        </div>
    );
}

export default Search;
