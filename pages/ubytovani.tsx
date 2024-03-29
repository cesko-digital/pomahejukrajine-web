import { GetServerSidePropsContext, GetStaticProps } from "next";
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
import { RegisterForm, RegisterFormProps } from "../components/RegisterForm";
import FormInput from "../components/FormInput";
import {
	Language,
	OfferType,
	PublicQueryResult,
	Volunteer,
	publicQuery,
	Districts,
} from "../lib/shared";
import { useRouter } from "next/router";
import { CZECH } from "../utils/constants";

let values:
	| RegisterFormProps
	| (PublicQueryResult & { volunteerData?: Volunteer; editing?: false })
	| {
			languages: Language[];
			uk?: boolean;
			volunteerData?: Volunteer;
			editing: true;
			offerTypes?: OfferType[];
			districts?: Districts;
	  };

interface UbytovaniProps extends PublicQueryResult {}

const Ubytovani = ({ offerTypes, languages, districts }: UbytovaniProps) => {
	const { t } = useTranslation(["common", "ubytovani"]);
	const { locale } = useRouter();

	return (
		<div className="antialiased text-black scroll-smooth">
			<Meta
				title={t("common:meta.title")}
				description={t("common:meta.description")}
			/>
			<Header />
			<HelpFindAccommodation />
			<AccommodationReasons />
			<HowItWorks />
			<AccommodationSupport />
			<MakeItClear />
			<ContactAndCommunication />
			<FormInput
				header={t("ubytovani:registerForm.header")}
				text={t("ubytovani:registerForm.text")}
			/>
			<div id="offerAccommodation" className="">
				<RegisterForm
					{...values}
					languages={languages}
					uk={locale === CZECH ? false : true}
					offerTypes={offerTypes}
					districts={districts}
					type="ubytovani"
				/>
			</div>
			<Footer />
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
		},
		body: JSON.stringify({
			query: `{ ${publicQuery} }`,
		}),
	});

	const json = await response.json();
	const { data } = json;

	return {
		props: {
			...data,
			...(await serverSideTranslations(context.locale as string, [
				"common",
				"ubytovani",
			])),
		},
	};
}

export default Ubytovani;
