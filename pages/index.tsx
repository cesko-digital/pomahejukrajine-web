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
] as const;

const PartnersLogos = [
	{
		href: "https://nasiukrajinci.cz",
		path: "/logos/nasiukrajinci.svg",
		width: 160,
		height: 40,
	},
	{
		href: "https://www.czechinvest.org",
		path: "/logos/czechinvest.svg",
		width: 180,
		height: 40,
	},
	{
		href: "https://www.stojimezaukrajinou.cz",
		path: "/logos/stojimezaukrajinou.svg",
		width: 160,
		height: 40,
	},
	{
		href: "https://www.umapa.eu/",
		path: "/logos/umapa.svg",
		width: 120,
		height: 29,
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
			<div className="max-w-7xl mx-auto pt-2 px-3 md:px-8">
				<div className="grid gap-x-4 gap-y-3 grid-cols-1 md:grid-cols-2">
					<div className="bg-ua-yellow rounded-lg px-5 pt-10 pb-5 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidka">
							<a className="text-white bg-ua-blue font-bold rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark">
								{t("frontPage.offerHelp")}
							</a>
						</Link>
						<p className="text-center leading-7	 pt-4 md:pt-6">
							{t("frontPage.offerHelpText")}
						</p>
					</div>
					<div className="bg-ua-yellow rounded-lg px-5 pt-10 pb-5 md:px-20 md:pt-24 md:pb-16 flex flex-col items-center">
						<Link href="/nabidky">
							<a className="text-white bg-ua-blue font-bold rounded-md w-56 py-4 flex justify-center items-center hover:bg-ua-blue-dark">
								{t("frontPage.needHelp")}
							</a>
						</Link>
						<p className="text-center leading-7	 pt-4 md:pt-6">
							{t("frontPage.needHelpText")}
						</p>
					</div>
				</div>
				<div className="text-center py-16 md:py-24">
					<p className="font-bold max-w-3xl px-8 mx-auto pb-8 md:pb-12 leading-7">
						{t("frontPage.organizationList")}{" "}
						<Link href="/organizace">
							<a className="overflow-hidden underline break-all underline-offset-2 hover:no-underline">
								{t("frontPage.here")}
							</a>
						</Link>
						.
					</p>
					<p className="font-bold">{t("frontPage.organization")}</p>
					<p className="max-w-3xl mx-auto px-8 leading-7">
						{t("frontPage.organizationText")}{" "}
						<a
							className="underline underline-offset-2 hover:no-underline"
							target="_blank"
							rel="noreferrer"
							href="https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
						>
							{t("frontPage.organizationLink")}
						</a>
						.
					</p>
					<p className="font-bold pt-8 md:pt-12">{t("frontPage.contactUs")}</p>
					<p className="max-w-3xl mx-auto px-8 md:pb-4 leading-7">
						{t("frontPage.contactUsText")}{" "}
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

			<div className="max-w-7xl mx-auto px-3 md:px-8 md:pt-4">
				<div className="flex justify-center my-14 hover:opacity-70">
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

				<p className="text-center px-8 leading-7">
					{t("frontPage.partnersText")}
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

				<p className="text-center mt-24 md:mt-40">{t("frontPage.partners")}</p>
				<div className="flex flex-wrap justify-center max-w-3xl	mx-auto">
					{PartnersLogos.map((logo) => (
						<div
							key={logo.path}
							className="mx-4 mt-6 hover:opacity-70 flex items-center"
						>
							<Link href={logo.href}>
								<a>
									<Image
										src={logo.path}
										width={logo.width}
										height={logo.height}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ["common"])),
		},
	};
};

export default Home;
