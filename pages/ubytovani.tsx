import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import { HowItWorks } from "../components/accommodation/HowItWorks";
import { AccommodationReasons } from "../components/accommodation/AccommodationReasons";
import { AccommodationSupport } from "../components/accommodation/AccommodationSupport";
import { MakeItClear } from "../components/accommodation/MakeItClear";
import { ContactAndCommunication } from "../components/accommodation/ContactAndCommunication";
import { HelpFindAccommodation } from "../components/accommodation/HelpFindAccommodation";

const Ubytovani = () => {
	const { t } = useTranslation(["common", "ubytovani"]);

	return (
		<div className="antialiased text-black">
			<Meta
				title={t("common:meta.title")}
				description={t("common:meta.description")}
			/>
			<Header />
			<HelpFindAccommodation />
			<AccommodationReasons />
			<HowItWorks />
			{/*<AccommodationSupport />*/}
			<MakeItClear />
			<ContactAndCommunication />
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
