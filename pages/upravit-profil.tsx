import Cookies from "cookies";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextPage,
} from "next";
import Link from "next/link";
import { useCallback, useState } from "react";

import Header from "../components/header";
import { Meta } from "../components/Meta";
import { VolunteerForm } from "../components/VolunteerForm";
import {
	EditVolunteerFormState,
	FormError,
	getVolunteerDetail,
	Language,
	listVolunteerIds,
} from "../lib/shared";

interface EditProfileProps {
	languages: Language[];
	volunteerDetails: EditVolunteerFormState;
}

const EditProfile: NextPage<EditProfileProps> = ({
	languages,
	volunteerDetails,
}) => {
	const [submitting, setSubmitting] = useState<
		false | "loading" | "error" | "success"
	>(false);

	const [defaultVolunteerDetails, setDefaultVolunteerDetails] =
		useState<EditVolunteerFormState>(volunteerDetails);
	const [errors, setErrors] = useState<FormError[]>([]);
	const disabled = submitting === "loading";

	const onSubmit = useCallback(async (values) => {
		setSubmitting("loading");

		const response = await fetch("/api/update-profile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: values,
			}),
		});
		console.log(response);
		let ok = response.ok;

		let json: any;
		try {
			json = await response.json();
		} catch (e) {}

		if (ok && json.ok) {
			setSubmitting("success");
			setDefaultVolunteerDetails(json.volunteer);
		} else {
			if (json && !json.ok && Array.isArray(json.errors)) {
				setErrors(json.errors);
			}
			setSubmitting("error");
		}
	}, []);

	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Nabídky pomoci - Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center mt-2">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Upravit svůj osobní profil
							</h2>
						</div>

						<div className="text-center mt-4">
							<Link href="/moje-nabidky" prefetch={false}>
								<a className="underline">Zpět na moje nabídky</a>
							</Link>
						</div>

						{submitting === "error" && (
							<div className="mt-5">
								<p>Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.</p>
							</div>
						)}
						{submitting === "success" && (
							<div className="mt-5 p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
								<p className="mx-3 font-medium text-white">
									Váš profil byt úspěšně uložen.
								</p>
							</div>
						)}

						<div className="mt-6">
							<VolunteerForm
								languages={languages}
								disabled={disabled}
								defaultState={volunteerDetails}
								errors={errors}
								onSubmit={onSubmit}
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
			volunteerDetails: {
				...volunteerDetails,
				languages: volunteerDetails.languages.map((lang) => lang.language.id),
			},
		},
	};
}
