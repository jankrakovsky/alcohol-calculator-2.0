import Head from 'next/head'
import HelperTooltip from "../../src/components/HelperTooltip";

export default function OProjektu() {
	return (
		<main className="h-full">
			<Head>
				<title>O projektu | Alkohol kalkulačka</title>
			</Head>

			<section className="flex flex-col gap-6">
				<article>
					<h2 className="mb-4 text-2xl font-bold">Výpočet</h2>

					<p>
						<HelperTooltip title="Počet promile alkoholu v krvi [‰]" text="Alkohol v krvi" placement="top" />
						{" = ("}
						<HelperTooltip title="Množství nápoje [ml]" text="Objem" placement="top" />
						{" * "}
						<HelperTooltip title="Obsah alkoholu v nápoji [%]" text="Alkohol" placement="top" />
						{" * "}
						<HelperTooltip title="Hustota alkoholu - konstanta" text="0.8" placement="top" />
						{" / "}
						<HelperTooltip title="Procenta převedeny na desetinné číslo" text="100" placement="top" />
						{") / ("}
						<HelperTooltip title="Vaše váha [kg]" text="Váha" placement="top" />
						{" * "}
						<HelperTooltip title="Množství vody v těle [%]" text="Voda v těle" placement="top" />
						{")"}
					</p>
					<p>
						{"Počet hodin do vystřízlivění = ("}
						<HelperTooltip title="Množství nápoje [ml]" text="Objem" />
						{" * "}
						<HelperTooltip title="Obsah alkoholu v nápoji [%]" text="Alkohol" />
						{" * "}
						<HelperTooltip title="Hustota alkoholu - konstanta" text="0.8" />
						{" / "}
						<HelperTooltip title="Procenta převedeny na desetinné číslo" text="100" />
						{") - ("}
						<HelperTooltip title="Čas potřebný k vystřízlivění [h]" text="x hodin" />
						{" * "}
						<HelperTooltip title="Alkohol, který lidské tělo dokáže rozložit. muži: 0.1; ženy: 0.085 [g/h]" text="Odbouráváno za hodinu" />
						{" * "}
						<HelperTooltip title="Vaše váha [kg]" text="Váha" />
						{")"}
					</p>
				</article>

				<article>
					<h2 className="text-2xl font-bold">Proč vznikl tento projekt?</h2>
					<p>
						Tento projekt vznikl nejen jako studentský projekt ale i nástroj, který může lidem pomoci při rozhodování zda jsou schopni například dorazit do práce.
						Alkohol je v České republice velice populární forma zábavy, je ale důležité přistupovat k alkoholu s respektem.
					</p>
				</article>

				<article>
					<h2 className="text-2xl font-bold">Jaká je přesnost dat?</h2>
					<p>
						Aplikace se snaží poskytovat co nejpřesnější data z Vámi poskytnutých informací. Je důležité vyplnit požadované informace co nejpřesněji, jelikož každý faktor ovlivňuje výsledek. Pro nejvyšší přesnost je však nutné zakoupit alkohol metr. Výsledky jsou pouze orientační. Veškeré odpovědnosti za zkreslené/nepřesné výsledky se zříkávám.
					</p>
				</article>

				<h2 className="mt-8 text-2xl font-bold">Děkuji Vám za využívání této webové aplikace!</h2>
			</section>
		</main >
	)
}
