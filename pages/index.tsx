import type { NextPage } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import styles from "./index.module.css";

const Logos = [
	{ href: "https://www.opu.cz/cs/", path: "/logos/opu.jpg" },
	{ href: "https://adra.cz", path: "/logos/adra.jpg" },
	{ href: "https://mostpro.cz/", path: "/logos/mostpro.jpg" },
	{ href: "https://www.charita.cz/", path: "/logos/charita.jpg" },
	{ href: "https://mkc.cz/", path: "/logos/multikulturnicentrumpraha.jpg" },
	{
		href: "https://www.migrace.com/",
		path: "/logos/sdruzeniprointegraciamigraci.jpg",
	},
	{ href: "https://inbaze.cz/", path: "/logos/inbaze.jpg" },
	{ href: "https://meta-ops.eu/", path: "/logos/meta.jpg" },
	{ href: "https://www.amnesty.cz/", path: "/logos/amnestyinternational.jpg" },
	{ href: "https://www.facebook.com/spolek.Amiga", path: "/logos/amiga.jpg" },
	{ href: "https://nesehnuti.cz/", path: "/logos/nesehnuti.jpg" },
	{ href: "https://www.diakonie.cz/", path: "/logos/diakonie.jpg" },
	{ href: "https://www.strada.cz/", path: "/logos/lastrada.jpg" },
	{ href: "https://www.clovekvtisni.cz/", path: "/logos/clovekvtisni.jpg" },
	{ href: "https://plnu.cz/", path: "/logos/pomahamelidemnauteku.jpg" },
	{
		href: "https://www.facebook.com/atlasoftodaysworld",
		path: "/logos/atlasmigrace.jpg",
	},
] as const;

const PartnersLogos = [
	{ href: "https://nasiukrajinci.cz", path: "/logos/nasiukrajinci.svg" },
	{ href: "https://www.czechinvest.org", path: "/logos/czechinvest.svg" },
	{
		href: "https://www.stojimezaukrajinou.cz",
		path: "/logos/stojimezaukrajinou.svg",
	},
	{ href: "https://www.umapa.eu/", path: "/logos/umapa.svg" },
] as const;

const Home: NextPage = () => {
	return (
		<div
			className="antialiased text-black text-xs md:text-base leading-normal"
			data-testid="page-home"
		>
			<Meta
				title="Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="max-w-7xl mx-auto pt-1 px-3 md:px-8">
				<div className="grid gap-x-4 gap-y-3 grid-cols-1 md:grid-cols-2">
					<div className="bg-ua-yellow rounded-lg px-5 pt-10 pb-5 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidka">
							<a className="inline-block text-white bg-ua-blue rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark">
								Nabízím pomoc
							</a>
						</Link>
						<p className="text-center pt-4 md:pt-6">
							Zde můžete vložit svou nabídku. Některé nabídky, například
							materiální pomoc, ale i některé služby, budou okamžitě zveřejněny
							a využít je může kdokoli. S ostatními nabídkami pracují pouze
							registrované pomáhající organizace.
						</p>
					</div>
					<div className="bg-ua-yellow rounded-lg px-5 pt-10 pb-5 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidky">
							<a className="inline-block text-white bg-ua-blue rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark">
								Nabídky pomoci
							</a>
						</Link>
						<p className="text-center pt-4 md:pt-6">
							Zde můžete vyhledat materiální pomoc, nebytové prostory, dopravu
							nebo některé služby a přímo o ně požádat. Potřebujete-li využít
							jiné typy pomoci, kontaktujte vhodnou pomáhající organizaci.
						</p>
					</div>
				</div>
				<div className="text-center py-16 md:py-20">
					<p className="font-bold">Jste pomáhající organizace?</p>
					<p className="max-w-3xl mx-auto px-8">
						Pokud jste neziskovka, obec, škola nebo občanská iniciativa, která
						pomáhá uprchlíkům z Ukrajiny a potřebuje přístup k neveřejným
						nabídkám pomoci,{" "}
						<a
							className="underline underline-offset-2 hover:no-underline"
							target="_blank"
							rel="noreferrer"
							href="https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
						>
							vyplňte, prosím, formulář a domluvíme se
						</a>
						.
					</p>
					<p className="font-bold pt-8">Potřebujete nás kontaktovat?</p>
					<p className="max-w-3xl mx-auto px-8">
						Napište nám na{" "}
						<a
							className="underline underline-offset-2 hover:no-underline overflow-hidden  break-all"
							href="mailto:pomahejukrajine@migracnikonsorcium.cz?subject=PomáhejUkrajině"
						>
							pomahejukrajine@migracnikonsorcium.cz
						</a>
						.
					</p>
				</div>
			</div>

			<div className="border-t-8 border-t-ua-blue border-b-8 border-b-ua-yellow" />

			<div className="max-w-7xl mx-auto px-3 md:px-8">
				<div className="flex justify-center my-14">
					<Image
						src="/logos/konsorcium.svg"
						width={232}
						height={66}
						alt="Konsordium nevládních organizací pracujících s migranty"
					/>
				</div>

				<p className="text-center px-8">
					Tuto platformu provozuje Konsorcium nevládních organizací pracujících
					s migranty v ČR. Členy jsou:
				</p>

				<div className="flex flex-wrap justify-center mx-8 mt-8">
					{Logos.map((logo) => (
						<div key={logo.path} className="mx-4 mb-8 hover:opacity-70">
							<Link href={logo.href}>
								<a>
									<Image
										src={logo.path}
										width={138}
										height={75}
										alt={logo.href}
									/>
								</a>
							</Link>
						</div>
					))}
				</div>

				<p className="text-center mt-24 md:mt-40">Partneři</p>
				<div className="flex flex-wrap justify-center max-w-3xl	mx-auto">
					{PartnersLogos.map((logo) => (
						<div key={logo.path} className="mx-4 mt-6 hover:opacity-70">
							<Link href={logo.href}>
								<a>
									<Image
										src={logo.path}
										width={160}
										height={40}
										alt={logo.href}
									/>
								</a>
							</Link>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
