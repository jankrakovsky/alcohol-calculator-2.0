import Head from 'next/head'
import { useState } from "react"

export default function OProjektu() {
	const [formulaLegendOpen, setFormulaLegendOpen] = useState(false);

	return (
		<main className="h-full flex flex-col items-center gap-6">
			<Head>
				<title>O projektu | Alkohol kalkulačka</title>
			</Head>

			<section className="flex flex-col gap-6">
				<article>
					<h2 className="text-2xl font-bold">Jak počítáme?</h2>
					<p>Promile = (Objem * Obsah alkoholu * 0.8 / 100) / (Váha * Voda v těle)</p>
					<p>Počet hodin do vystřízlivění = (Objem * Obsah alkoholu * 0.8 / 100) - (x hodin * Odbourávání alkoholu za hodinu * Váha)</p>

					<button onClick={() => setFormulaLegendOpen(!formulaLegendOpen)} className="text-accent hover:text-accent-light transition-all">{formulaLegendOpen ? "Skrýt legendu" : "Zobrazit legendu"}</button>

					{formulaLegendOpen && (
						<span className="mt-2 mb-4 p-2 w-fit flex flex-col gap-1 dark:bg-accent-dark dark:border-accent-light rounded-lg rounded-t-none">
							<p>Obsah alkoholu = Obsah alkoholu [%]</p>
							<p>Objem = Množství alkoholu [ml]</p>
							<p>0.8 = Hustota alkoholu</p>
							<p>Trvání pití = Čas po který jste pil/a [h]</p>
							<p>Odbourávání alkoholu za hodinu = Alkohol, který lidské tělo dokáže rozložit. muži: 0.1; ženy: 0.085 [g/h]</p>
							<p>Váha = Vaše váha [kg]</p>
							<p>Voda v těle = Množství vody v těle [%]</p>
							<p>X hodin = Počet hodin potřebný k vystřízlivění</p>
						</span>
					)}
				</article>

				<article>
					<h2 className="text-2xl font-bold">Proč vznikl tento projekt?</h2>
					<p>
						Tento projekt vznikl nejen jako studentský projekt, ale i jako nástroj pro analýzu vztahu člověka k alkoholu.
						Alkohol je populární droga, je však potřeba jí mít pod kontrolou.
						Naši službou pomáháme uživateli s informovaností ohledně trvání důsledků konzumace alkoholu.
						Dále se snažíme uživateli dát prezentovat relevantní data k lepšímu uvědomění jeho/jejího vztahu k této návykové látce.
					</p>
				</article>

				<article>
					<h2 className="text-2xl font-bold">Jaká je přesnost dat?</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, veniam saepe omnis magnam maiores ab, expedita quibusdam hic in libero ipsam natus animi. Excepturi accusantium, nesciunt corrupti sed voluptatum impedit, officia ipsum dicta, nihil rem magnam ab. Tempore totam nostrum veniam non repudiandae, tempora fuga.
					</p>
				</article>

				<h2 className="mt-8 text-2xl font-bold">Děkujeme Vám za využívání této webové aplikace!</h2>
			</section>
		</main>
	)
}
