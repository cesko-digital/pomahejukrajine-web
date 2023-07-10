import type { GetStaticProps, NextPage } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
	{ href: "https://dignityrh.org/", path: "/logos/dignity.svg" },
	{ href: "http://www.kalyna.cz/", path: "/logos/kalyna.svg" },
	{ href: "https://czechdoc.cz/cs/", path: "/logos/czechdoc.png" },
] as const;

const PartnersLogos = [
	{
		href: "https://nasiukrajinci.cz",
		path: "/logos/nasiukrajinci.svg",
		height: 40,
	},
	{
		href: "https://www.czechinvest.org",
		path: "/logos/czechinvest.svg",
		height: 40,
	},
	{
		href: "https://www.stojimezaukrajinou.cz",
		path: "/logos/stojimezaukrajinou.svg",
		height: 40,
	},
	{
		href: "https://www.umapa.eu/",
		path: "/logos/umapa.svg",
		height: 29,
	},
	{
		href: "https://cesko.digital/",
		path: "/logos/ceskodigital.svg",
		height: 28,
	},
	{
		href: "https://www.mvcr.cz/ministerstvo-vnitra-ceske-republiky.aspx",
		path: "/logos/mvcr.svg",
		height: 40,
	},
] as const;

const Home: NextPage = () => {
	const { t } = useTranslation();

	return (
		<div
			className="antialiased text-black text-xs md:text-base leading-normal"
			data-testid="page-home"
		>
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-yellow-lightest md:bg-white">
				<h2 className="text-center text-[30px] font-bold pt-10 pb-4">
					{t("welcomeText.Header")}
				</h2>
				<p className="text-center">{t("welcomeText.paragraph")}</p>
				<p className="text-center pb-16">{t("welcomeText.paragraph2")}</p>
			</div>
			<div className="text-base max-w-full mx-auto">
				<div className="grid gap-x-0 gap-y-0 md:gap-y-3 grid-cols-1 md:grid-cols-3">
					<div className="bg-ua-yellow px-5 py-10 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidka">
							<a className="text-white text-lg bg-ua-blue font-bold rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
								{t("frontPage.offerHelp")}
							</a>
						</Link>
						<p
							className="text-center leading-6 pt-4 md:pt-6 mx-w-l"
							dangerouslySetInnerHTML={{
								__html: t("frontPage.offerHelpText"),
							}}
						/>
					</div>
					<div className="bg-ua-yellow px-5 py-10 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidky">
							<a className="text-white text-lg bg-ua-blue font-bold rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
								{t("frontPage.needHelp")}
							</a>
						</Link>
						<p
							className="text-center leading-6 pt-4 md:pt-6"
							dangerouslySetInnerHTML={{
								__html: t("frontPage.needHelpText"),
							}}
						/>
					</div>
					<div className="bg-ua-yellow px-5 py-10 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/ubytovani">
							<a className="text-white text-lg bg-ua-blue font-bold rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
								{t("frontPage.acommodation")}
							</a>
						</Link>
						<p
							className="text-center leading-6 pt-4 md:pt-6"
							dangerouslySetInnerHTML={{
								__html: t("frontPage.acommodationText"),
							}}
						/>
					</div>
				</div>
				<div className="text-center py-16 md:py-24">
					<p className="font-bold max-w-3xl md:px-8 mx-auto pb-8 md:pb-12 leading-6">
						{t("frontPage.organizationList")}{" "}
						<Link href="/organizace">
							<a className="overflow-hidden underline break-all underline-offset-2 hover:no-underline text-ua-blue font-bold">
								{t("frontPage.here")}
							</a>
						</Link>
						.
					</p>
					<h3 className="font-bold">{t("frontPage.organization")}</h3>
					<p className="max-w-3xl mx-auto md:px-8 leading-6">
						{t("frontPage.organizationText")}{" "}
						<a
							className="underline underline-offset-2 hover:no-underline text-ua-blue font-bold"
							target="_blank"
							rel="noreferrer"
							href="https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
						>
							{t("frontPage.organizationLink")}
						</a>
						.
					</p>
					<h3 className="font-bold pt-8 md:pt-12">
						{t("frontPage.contactUs")}
					</h3>
					<p className="max-w-3xl mx-auto md:px-8 md:pb-4 leading-6">
						{t("frontPage.contactUsText")}{" "}
						<a
							className="underline underline-offset-2 hover:no-underline overflow-hidden text-ua-blue font-bold underline"
							href="mailto:pomahejukrajine@migracnikonsorcium.cz?subject=PomáhejUkrajině"
						>
							pomahejukrajine@migracnikonsorcium.cz
						</a>
						.
					</p>
				</div>
			</div>

			<div className="flex justify-center mb-12 hover:opacity-70 transition duration-150">
				<Link href="https://migracnikonsorcium.cz">
					<a>
						<Image
							src="/logos/konsorcium.svg"
							width={232}
							height={66}
							alt="Konsordium nevládních organizací pracujících s migranty"
						/>
					</a>
				</Link>
			</div>

			<Footer />

			<div className="text-base max-w-7xl mx-auto px-3 md:px-8 pt-[70px]">
				<p className="text-center md:px-8 leading-6">
					{t("frontPage.partnersText")}
				</p>

				<div className="flex flex-wrap justify-center md:mx-8 mt-8">
					{Logos.map((logo) => (
						<div
							key={logo.path}
							className="mx-4 mb-8 hover:opacity-70 transition duration-150"
						>
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

				<p className="text-center mt-24 md:mt-20">{t("frontPage.partners")}</p>
				<div className="flex flex-wrap justify-center mx-auto">
					{PartnersLogos.map((logo) => (
						<div
							key={logo.path}
							className="mx-4 mt-6 hover:opacity-70 flex items-center transition duration-150"
						>
							<Link href={logo.href}>
								<a>
									<Image
										src={logo.path}
										width={160}
										height={logo.height}
										alt={logo.href}
									/>
								</a>
							</Link>
						</div>
					))}
				</div>
				<p className="pt-6 text-center text-grey-dark text-footer leading-relaxed max-w-3xl mx-auto pb-12">
					Tento projekt je spolufinancován projektem Ministerstvem vnitra ČR v
					rámci projektu „Poskytování informačního servisu institucím
					prostřednictvím platformy Pomáhej Ukrajině a koordinace občanské
					pomoci uprchlíkům z Ukrajiny“.
				</p>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ["common"])),
		},
	};
};

export default Home;
