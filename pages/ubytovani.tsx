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
} from "../lib/shared";

let values:
	| RegisterFormProps
	| (PublicQueryResult & { volunteerData?: Volunteer; editing?: false })
	| {
			languages: Language[];
			uk?: boolean;
			volunteerData?: Volunteer;
			editing: true;
			offerTypes?: OfferType[];
			districts?: undefined;
	  };

interface UbytovaniProps extends PublicQueryResult {}

const Ubytovani = ({ offerTypes }: UbytovaniProps) => {
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
			<AccommodationSupport />
			<MakeItClear />
			<ContactAndCommunication />
			<FormInput />
			<div className="grid max-w-lg mx-auto mt-16">
				<RegisterForm
					{...values}
					languages={[
						{
							id: "1",
							name: t("ubytovani:registerForm.languageOption.cz"),
							nameUK: t("ubytovani:registerForm.languageOption.cz"),
						},
						{
							id: "2",
							name: t("ubytovani:registerForm.languageOption.en"),
							nameUK: t("ubytovani:registerForm.languageOption.en"),
						},
						{
							id: "3",
							name: t("ubytovani:registerForm.languageOption.ua"),
							nameUK: t("ubytovani:registerForm.languageOption.ua"),
						},
						{
							id: "4",
							name: t("ubytovani:registerForm.languageOption.ru"),
							nameUK: t("ubytovani:registerForm.languageOption.ru"),
						},
					]}
					offerTypes={offerTypes}
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

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale as string, [
// 				"common",
// 				"ubytovani",
// 			])),
// 		},
// 	};
// };

export default Ubytovani;
