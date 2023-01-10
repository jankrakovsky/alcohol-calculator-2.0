import Head from 'next/head'
import HelperTooltip from "../../src/components/HelperTooltip";

export default function OProjektu() {
	return (
		<main className="h-full flex flex-col items-center gap-6">
			<Head>
				<title>O projektu | Alkohol kalkulačka</title>
			</Head>

			<section className="flex flex-col gap-6">
				<article>
					<h2 className="text-2xl font-bold">Jak počítáme?</h2>

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
						Tento projekt vznikl nejen jako studentský projekt, ale i jako nástroj pro analýzu vztahu člověka k alkoholu.
						Alkohol je populární droga, je však potřeba jí mít pod kontrolou.
						Naši službou pomáháme uživateli s informovaností ohledně trvání důsledků konzumace alkoholu.
						Dále se snažíme uživateli dát prezentovat relevantní data k lepšímu uvědomění jeho/jejího vztahu k této návykové látce.
					</p>
				</article>

				<article>
					<h2 className="text-2xl font-bold">Jaká je přesnost dat?</h2>
					<p>
						Snažíme se poskytovat co nejpřsnější data z Vámi poskytnutých informací. Je důležité vyplnit požadavaná data co nejpřesněji, jelikož každý faktor ovlivňuje výsledek.
						Pro největší přesnost je však nejlepší zakoupit alkoholmetr, který je nejpřesnějším řešení. Veškeré odpovědnosti za zkreslené výsledky se zříkáme.
					</p>
				</article>

				<h2 className="mt-8 text-2xl font-bold">Děkujeme Vám za využívání této webové aplikace!</h2>
			</section>
		</main >
	)
}
