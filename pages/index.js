import Image from "next/image"
import Link from "next/link"
import ImageParty from '../src/images/party.svg'

export default function Home() {
	return (
		<main className="mx-auto h-full max-w-screen-2xl flex flex-col justify-center items-center">
			<section className="w-full grid gap-4 grid-cols-2">
				<div className="flex flex-col gap-6 justify-center">
					<h1 className="text-6xl text-accent dark:text-accent-light">Jsem Váš osobní rádce na alkohol!</h1>
					<p className="text-2xl">
						Potřebujete za volant či do práce?
						Pro rychlé využití přejděte rovnou do kalkulačky, vyplňte informace a vše už uděláme za Vás.
						Pro využítí všech našich funkcí se doporučujeme zaregistrovat.
					</p>
					<div className="flex gap-2">
						<Link href="#">
							<button className="p-4 font-semibold text-light dark:text-dark bg-accent border-accent border-2 border-solid rounded-lg">Přejít k registraci</button>
						</Link>

						<Link href="/kalkulacka">
							<button className="p-4 font-semibold border-accent border-2 border-solid rounded-lg">Přejít do kalkulačky</button>
						</Link>

					</div>
				</div>
				<Image src={ImageParty} alt="People enjoying party" />
			</section>
		</main>
	)
}
