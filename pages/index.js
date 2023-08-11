import Image from 'next/image';
import Link from 'next/link';

import ImageParty from '../src/images/party.svg';

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-center">
			<section className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2">
				<div className="flex flex-col justify-center gap-6">
					<h1 className="text-4xl text-accent dark:text-accent-light md:text-5xl">Jsem Váš osobní rádce na alkohol!</h1>
					<p className="text-xl leading-relaxed md:text-2xl">
						Potřebujete za volant či do práce? Pro rychlé využití přejděte rovnou do kalkulačky, vyplňte informace a vše se vypočítá za
						Vás. Pro využítí všech funkcí se můžete přihlásit přes Google účet.
					</p>
					<div className="flex gap-2">
						<Link href="#">
							<button className="rounded-lg border-2 border-solid border-accent bg-accent p-4 font-semibold text-light dark:text-dark">
								Přihlásit se přes Google
							</button>
						</Link>

						<Link href="/kalkulacka">
							<button className="rounded-lg border-2 border-solid border-accent p-4 font-semibold">Přejít do kalkulačky</button>
						</Link>
					</div>
				</div>
				<Image src={ImageParty} alt="People enjoying party" />
			</section>
		</main>
	);
}
