import Cookies from "cookies";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextPage,
} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Header from "../components/header";
import { Meta } from "../components/Meta";
import { RegisterForm } from "../components/RegisterForm";
import {
	FormError,
	getVolunteerDetail,
	Language,
	listVolunteerIds,
	Volunteer,
} from "../lib/shared";

interface EditProfileProps {
	languages: Language[];
	volunteerDetails: Volunteer;
}

const EditProfile: NextPage<EditProfileProps> = ({
	languages,
	volunteerDetails,
}) => {
	const { t } = useTranslation();

	const [defaultVolunteerDetails, setDefaultVolunteerDetails] =
		useState<Volunteer>(volunteerDetails);

	useEffect(() => {
		setDefaultVolunteerDetails(volunteerDetails);
	}, [volunteerDetails]);

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center mt-2">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{t("mujProfil.title")}
							</h2>
						</div>

						<div className="text-center mt-4">
							<Link href="/moje-nabidky" prefetch={false}>
								<a className="underline">{t("mujProfil.back")}</a>
							</Link>
						</div>

						<div className="mt-6">
							<RegisterForm
								languages={languages}
								volunteerData={defaultVolunteerDetails}
								editing={true}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditProfileProps>> {
	const cookies = new Cookies(context.req, context.res);
	const token = cookies.get("token");

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}

	// Get list of available languages from Contember.
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
				query EditProfileProps {
					languages: listLanguage(orderBy: [{ order: asc }]) {
						id
						name
					}
				}
			`,
		}),
	});

	const languagesJson = await response.json();
	const languagesResponse = languagesJson.data;

	const volunteerIds = await listVolunteerIds(token);
	if (!volunteerIds) {
		cookies.set("token", "", { maxAge: -99999999 });
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	const volunteerDetails = await getVolunteerDetail(token, volunteerIds[0]);

	if (!volunteerDetails) {
		return {
			redirect: {
				destination: "/moje-nabidky",
				permanent: true,
			},
		};
	}

	return {
		props: {
			languages: languagesResponse.languages,
			volunteerDetails: volunteerDetails,
			...(await serverSideTranslations(context.locale as string, ["common"])),
		},
	};
}
