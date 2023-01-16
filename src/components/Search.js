import {useState} from "react";
import DrinkRow from "./DrinkRow";

const Search = ({drinks, addDrink}) => {
    const [query, setQuery] = useState("");

    /* return all drinks if query is empty, otherwise filters only the ones with match in keywords */
    const filteredDrinks = query === "" ? drinks : drinks.filter((drink) => drink.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())));

    return (
        <div className="min-w-[450px] relative flex flex-col gap-2 text-dark bg-accent-light dark:bg-accent border-[6px] border-accent border-solid rounded-xl">
            <input className="peer/search px-4 py-2 h-12 dark:text-light dark:bg-dark focus:outline-none rounded-md"
                   placeholder="Můžete vesele začít vyhledávat" onChange={event => setQuery(event.target.value)}/>

            <div className="hiddenpeer-focus/search:block absolute top-[54px] px-2 w-full max-h-[200px] bg-accent-light dark:bg-accent-dark rounded-b-xl overflow-scroll">
                {/* show all consumed drinks in DrinkCard component */}
                {filteredDrinks.map((drink, index) => (
                    <DrinkRow drink={drink} addDrink={addDrink} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default Search;
