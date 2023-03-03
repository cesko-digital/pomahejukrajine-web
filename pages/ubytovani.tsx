import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";

const Ubytovani = () => {
	const { t } = useTranslation(["common", "ubytovani"]);

	return (
		<div className="antialiased text-black">
			<Meta
				title={t("common:meta.title")}
				description={t("common:meta.description")}
			/>
			<Header />
			<section className="bg-yellow-lightest text-center py-6 md:py-11 flex justify-center">
				<div className="max-w-[1010px] px-3">
					<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-7">
						{t("ubytovani:box.title")}
					</h2>
					{[...Array(4)].map((_, i) => (
						<p
							key={i}
							className="leading-7 mb-4"
							dangerouslySetInnerHTML={{
								__html: t(`ubytovani:box.line${i + 1}`),
							}}
						/>
					))}
					<div className="flex justify-center flex-col md:flex-row gap-3 mt-10 md:mt-14">
						<Link href="#offerAccommodation">
							<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-full md:w-[225px] py-4 flex mr-0 md:mr-4 justify-center items-center hover:bg-ua-blue-dark transition duration-150">
								{t("ubytovani:box.button1")}
							</a>
						</Link>
						<Link href="#howItWorks">
							<a className="text-ua-blue text-[18px] font-bold border-2 border-ua-blue rounded-md w-full md:w-[225px] py-4 flex justify-center items-center hover:bg-ua-blue-dark hover:text-white transition duration-150">
								{t("ubytovani:box.button2")}
							</a>
						</Link>
					</div>
					<div className="mt-4 md:mt-7 mb-8 md:mb-0">
						<Link href="#clarify">
							<a className="text-[16px] font-bold underline">
								{t("ubytovani:box.link")}
							</a>
						</Link>
					</div>
				</div>
			</section>
			<div className="bg-white py-8 px-3 overflow-hidden sm:px-6 md:px-8 md:py-8">
				<div className="max-w-7xl mx-auto">
					<section className="text-center">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-10">
							{t("ubytovani:reasons.title")}
						</h2>
						<div className="text-base md:text-sm flex gap-5 flex-col md:flex-row">
							<div className="w-full md:w-1/3 md:px-9">
								<Image
									src="/ubytovani/solidarita.svg"
									width={117}
									height={117}
									alt={t("ubytovani:reason1.title")}
								/>
								<h3 className="font-bold py-6">
									{t("ubytovani:reason1.title")}
								</h3>
								<p
									className="leading-6"
									dangerouslySetInnerHTML={{
										__html: t("ubytovani:reason1.text"),
									}}
								/>
							</div>
							<div className="w-full md:w-1/3 md:px-9">
								<Image
									src="/ubytovani/integrace.svg"
									width={117}
									height={117}
									alt={t("ubytovani:reason2.title")}
								/>
								<h3 className="font-bold py-6">
									{t("ubytovani:reason2.title")}
								</h3>
								<p
									className="leading-6"
									dangerouslySetInnerHTML={{
										__html: t("ubytovani:reason2.text"),
									}}
								/>
							</div>
							<div className="w-full md:w-1/3 md:px-9">
								<Image
									src="/ubytovani/kulturniVymena.svg"
									width={117}
									height={117}
									alt={t("ubytovani:reason3.title")}
								/>
								<h3 className="font-bold py-6">
									{t("ubytovani:reason3.title")}
								</h3>
								<p
									className="leading-6"
									dangerouslySetInnerHTML={{
										__html: t("ubytovani:reason3.text"),
									}}
								/>
							</div>
						</div>
					</section>
					<section id="howItWorks" className="text-center pt-20 md:pt-28">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
							{t("ubytovani:howItWorks.title")}
						</h2>
						<p>{t("ubytovani:howItWorks.text")}</p>
						{[...Array(5)].map((_, i) => (
							<div key={i} className="mt-14 flex flex-col items-center">
								<div className="w-[144px] h-[148px]">
									<Image
										src={`/ubytovani/krok-${i + 1}.svg`}
										width={144}
										height={148}
										alt="krok"
									/>
								</div>
								<div>
									<span className="bg-ua-yellow inline-flex px-1">
										{`${i + 1}. ${t("ubytovani:step")}`}
									</span>
									<p className="text-[19px] font-bold mt-3 mb-7">
										{t(`ubytovani:step${i + 1}.title`)}
									</p>
									<p
										className="leading-6"
										dangerouslySetInnerHTML={{
											__html: t(`ubytovani:step${i + 1}.text`),
										}}
									/>
								</div>
							</div>
						))}
						<div className="flex justify-center mb-[91px]">
							<Link href="#offerAccommodation">
								<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-[225px] py-4 mt-9 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
									{t("ubytovani:box.button1")}
								</a>
							</Link>
						</div>
					</section>
					<section className="text-center">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
							Podpora ubytování
						</h2>
						<p></p>
					</section>
					<section id="clarify"></section>
					<section></section>
					<section id="offerAccommodation"></section>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				"common",
				"ubytovani",
			])),
		},
	};
};

export default Ubytovani;
