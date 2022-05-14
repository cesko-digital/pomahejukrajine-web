import { GetServerSidePropsContext, NextPage, NextApiResponse } from "next";
import Link from "next/link";
import { useState } from "react";
import { EditVolunteerForm } from "../components/EditVolunteerForm";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import { EditVolunteerFormState, Languages } from "../lib/shared";

interface EditProfileProps {
	languages: Languages;
	volunteerDetails: EditVolunteerFormState;
}

const EditProfile: NextPage<EditProfileProps> = ({
	languages,
	volunteerDetails,
}) => {
	const [submitting, setSubmitting] = useState<
		false | "loading" | "error" | "success"
	>(false);

	const disabled = submitting === "loading";

	console.log(languages, volunteerDetails);

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
							<Link href="#" prefetch={false}>
								<a onClick={() => window.history.back()} className="underline">
									Zpět na moje nabídky
								</a>
							</Link>
						</div>

						{submitting === "error" && (
							<div>
								<p>Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.</p>
							</div>
						)}

						<div className="mt-6">
							<EditVolunteerForm languages={languages} />
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
): Promise<{ props: EditProfileProps }> {
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
	const languages = languagesJson.data;

	return {
		props: {
			languages,
			volunteerDetails: {
				name: "",
				organization: "",
				phone: "",
				contactHours: "",
				expertise: "",
				languages: [""],
			},
		},
	};
}
