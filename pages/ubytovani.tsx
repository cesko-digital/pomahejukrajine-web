import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import { HowItWorks } from "../components/accommodation/HowItWorks";
import { AccommodationReasons } from "../components/accommodation/AccommodationReasons";

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
			<AccommodationReasons />
			<HowItWorks />
			<section className="text-center">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
					Podpora ubytování
				</h2>
				<p></p>
			</section>
			<section id="clarify"></section>
			<section></section>
			<section id="offerAccommodation"></section>

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