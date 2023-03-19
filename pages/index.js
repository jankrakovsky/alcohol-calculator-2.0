import Image from "next/image"
import Link from "next/link"
import ImageParty from '../src/images/party.svg'

export default function Home() {
    return (
        <main className="h-full flex flex-col justify-center items-center">
            <section className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex flex-col gap-6 justify-center">
                    <h1 className="text-6xl text-accent dark:text-accent-light">Jsem Váš osobní rádce na alkohol!</h1>
                    <p className="text-2xl">
                        Potřebujete za volant či do práce? Pro rychlé využití přejděte rovnou do kalkulačky, vyplňte
                        informace a vše se vypočítá za Vás. Pro využítí všech funkcí se můžete přihlásit přes Google
                        účet.
                    </p>
                    <div className="flex gap-2">
                        <Link href="#">
                            <button
                                className="p-4 font-semibold text-light dark:text-dark bg-accent border-accent border-2 border-solid rounded-lg">Přihlásit
                                se přes Google
                            </button>
                        </Link>

                        <Link href="/kalkulacka">
                            <button className="p-4 font-semibold border-accent border-2 border-solid rounded-lg">Přejít
                                do kalkulačky
                            </button>
                        </Link>

                    </div>
                </div>
                <Image src={ImageParty} alt="People enjoying party"/>
            </section>
        </main>
    )
}
