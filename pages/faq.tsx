import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const faqs = [
	{
		question: "Co je cílem?",
		answer:
			"Cílem platformy Pomáhej Ukrajině je soustředit nabídky a potřeby pomoci na jednom místě a adrese a co nejlépe je využívat, pomoci propojení nabídek a potřeb. Zároveň se snažíme spojit již existující nabídky a platformy.",
	},
	{
		question: "Kdo se může zapojit?",
		answer:
			"Úplně každý, kdo chce pomoci, ať již jako jednotlivec, firma, nebo obec. Prosíme, zadejte svou nabídku do databáze.",
	},
	{
		question: "Kdo tuto platformu zajišťuje?",
		answer:
			'Platformu zajišťuje <a class="underline" href="https://migracnikonsorcium.cz/cs/">Konsorcium nevládních organizací pracujících s migranty v ČR</a>, které sdružuje 15 nevládních organizací zabývajících se dlouhodobě migrací a integrací cizinců. Technologicky ji vyvinula společnost <a class="underline" href="https://www.contember.com/">Contember</a> s podporou dobrovolníků a podporovatelů. Prvotní impuls vznikl z podnětu Jana Böhma a Daniela Kolského.',
	},
	{
		question: "Jak se můžu zapojit?",
		answer:
			'Vyplněním <a class="underline" href="/nabidka">jednoduchého dotazníku</a>, kde popíšete, co nabízíte, a vyplníte základní kontakt a po ověření se vaše nabídka zobrazí v databázi nabídek. Tu mohou využívat potřební i jednotlivé organizace. Prosíme, nabízejte kapacity a služby, o kterých víte, že jsou zcela reálné. Svou nabídku pomoci můžete kdykoliv změnit, nebo zrušit.',
	},
	{
		question: "Nechcete nic nabídnout, naopak potřebujete pomoci?",
		answer:
			'Pokud potřebujete pomoci, na část nabídek můžete reagovat přímo. Ostatní jsou uzavřené k přímému kontaktu z důvodu bezpečnosti a ověřování nabídek. Pokud potřebujete pomoci, kontaktujte své regionální koordinační centrum, obec nebo pomáhající organizaci. Více viz rozcestník <a class="underline" href="https://www.stojimezaukrajinou.cz/">Stojíme za Ukrajinou</a>, který aktualizují dobrovolníci z <a class="underline" href="https://cesko.digital/">Česko.digital</a>.',
	},
	{
		question: "Proč jsou celé části nabídek skryté a nemohu na ně reagovat?",
		answer:
			"Část nabídek je otevřená, veřejně přístupná a může na ně reagovat kdokoli. Část nabídek je zpřístupněna pouze registrovaným organizacím a institucím. V tuto chvíli jsou již registrovaných organizací desítky a na nabídky reagují. <br /><br />Důvodem pro toto rozdělení je bezpečnost. Bohužel se již nyní objevují případy, kdy jsou příchozí a jejich křehká situace zneužívána. Dalším důvodem u tohoto typu nabídek je udržitelnost - hledáme zejména dlouhodobá, stabilní řešení. Děkujeme za pochopení.",
	},
	{
		question: "Jste organizace, obec nebo organizační složka státu?",
		answer:
			'Zaregistrujte se prostřednictvím <a class="underline" href="https://forms.gle/nTQMvytLBukhkycM9">formuláře</a>. Po jednoduchém ověření vás přiřadíme do systému a vy tak dostanete plný přístup a možnost reagovat na všechny nabídky pomoci.',
	},
	{
		question: "Co mohu nabídnout?",
		answer:
			"Potřeby se budou během času měnit a můžete kdykoliv upravit i to, co nabízíte ve vašem profilu. Děkujeme za každou smysluplnou nabídku pomoci, dobrovolnictví. ",
	},
	{
		question: "Jste expert / expertka?",
		answer:
			'Pokud jste odbornice/odborník, nabízíte nějakou seniorní znalost, nebo zkušenost (především psychologie, zdravotnictví, sociální práce, pedagogika dětí, nebo IT apod), prosím <a class="underline" href="/nabidka">dejte nám o tom vědět</a>, budeme vás kontaktovat.',
	},
	{
		question: "Potřebujete podporu, nebo pomoc?",
		answer:
			"Předpokládáme i možnost zadávání konkrétních potřeb, kterou chystáme po spuštění nabídkové části platformy. Nyní máte možnost vyhledávat a filtrovat v rámci zveřejněných nabídek pomoci. Prosíme, nejdříve zkuste před psaním vlastní poptávky projít existující nabídky.",
	},
	{
		question: "Jak to technicky funguje?",
		answer:
			"Po vyplnění jednoduchého dotazníku proběhne ověření vašeho emailu. V případě složitějších a rozsáhlejších nabídek vás budeme co nejdříve kontaktovat. ",
	},
	{
		question: "Chcete pomoci raději finančně?",
		answer:
			'To je skvělé a velice děkujeme za každou podporu. Seznam ověřených sbírek pomoci soustřeďuje projekt <a class="underline" href="https://www.stojimezaukrajinou.cz/">Stojíme za Ukrajinou</a> <a class="underline" href="https://cesko.digital/">Česko.digital</a>, případně můžete podpořit jakoukoliv ze sbírek organizací, které jsou členy Konsorcia. Děkujeme a vážíme si vaší podpory. ',
	},
	{
		question:
			"Děláme něco podobného jako dělá platforma Pomáhej Ukrajině, co teď?",
		answer:
			"To je skvělá a oceňujeme každou smysluplnou pomoc. Prosíme, pokud jste již nějakým způsobem organizováni, nebo jste jinou platformou (například ve škole, oddíle, v práci apod), dejte nám o sobě vědět, ať můžeme třeba spolupracovat.",
	},
	{
		question: "Všechny zveřejněné nabídky poskytuje Konsorcium?",
		answer:
			"Ne, tato platforma není přehledem toho, co poskytujeme my, nebo naši členové. Platforma se snaží soustředit co nejvíce kapacit na jednom místě. Snaží se s touto kapacitou také co nejlépe a efektivně pracovat. Konsorcium shromažďuje nabídky pomoci a umožňuje jednotlivcům a organizacím, aby na ně reagovali.",
	},
	{
		question: "Kontrolujete nějak kvality nabízených služeb?",
		answer:
			"Budeme se snažit dlouhodobě ověřovat nabídky, koordinovat jejich další využití i podporovat naše klientky a klienty.  Vždy se řídíme zájmem příchozích a snažíme se pro ně zajistit důstojné podmínky. Také proto nejsou některé nabídky přímo zveřejněny na webu, ale projdou nejprve ověřením a propojením pomáhajících a těch, kdo pomoc potřebují. Zapojené nevládní organizace nemohou přejímat odpovědnost za všechny nabídky ani za poptávku, ale pokusí se obě strany dobře informovat a propojit obě strany tak, aby pomoc byla co nejúčinnější. V případě zveřejněných nabídek, na které mohou reagovat přímo ti, kteří pomoc potřebuji, ale nemáme možnost kvalitu nabízených služeb kontrolovat.",
	},
	{
		question: "Jste novinář a chcete více informací?",
		answer:
			'Ozvěte se nám na <a class="underline" href="mailto:krchova@migracnikonsorcium.cz">krchova@migracnikonsorcium.cz</a>, rádi vám je poskytneme.',
	},
];

const Home: NextPage = ({ offerTypes, districts }: any) => {
	const { t } = useTranslation();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white">
				<div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
					<div>
						<h1 className="text-center text-4xl font-extrabold text-gray-900">
							Často kladené otázky
						</h1>
					</div>
					<div className="mt-12">
						<dl className="space-y-12">
							{faqs.map((faq) => (
								<div key={faq.question}>
									<dt className="text-lg leading-6 font-bold text-gray-900">
										{faq.question}
									</dt>
									<dd
										className="mt-2 text-base text-gray-700"
										dangerouslySetInnerHTML={{ __html: faq.answer }}
									></dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ["common"])),
		},
	};
};

export default Home;
