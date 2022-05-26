import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import {
	FormError,
	getVolunteerDetail,
	listVolunteerIds,
	RegisterFormState,
} from "../../lib/shared";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const data = req.body.data as RegisterFormState;
	const errors: FormError[] = [];

	if (data.phone === "" || data.phone === "+420") {
		errors.push({
			input: "phone",
			message: "Vyplňte prosím telefonní číslo",
		});
	}

	if (data.languages.length === 0) {
		errors.push({
			input: "languages",
			message: "Musíte vybrat alespoň jeden jazyk",
		});
	}

	if (errors.length) {
		res.status(400).json({ ok: false, errors });
		return;
	}

	const cookies = new Cookies(req, res);
	const token = cookies.get("token");

	if (!token) {
		res.status(401).json({ ok: false });
		return;
	}

	const volunteerIds = await listVolunteerIds(token);

	if (!volunteerIds) {
		res.status(401).json({ ok: false });
		return;
	}

	const volunteerId = volunteerIds[0];

	const volunteerDetails = await getVolunteerDetail(token, volunteerId);
	if (!volunteerDetails) {
		res.status(404).json({ ok: false });
		return;
	}

	const prevLanguageRelations = volunteerDetails.languages;
	const updateInput = {
		...data,
		languages: [
			// Create relations languages that don't exist on the Volunteer entity.
			...data.languages
				.filter(
					(languageId) =>
						!prevLanguageRelations.find(
							(relation) => relation.language.id === languageId
						)
				)
				.map((languageId) => ({
					create: {
						language: {
							connect: {
								id: languageId,
							},
						},
					},
				})),
			// Delete relations with languages that were unselected.
			...prevLanguageRelations
				.filter(
					(languageRelation) =>
						!data.languages.find(
							(languageId) => languageRelation.language.id === languageId
						)
				)
				.map((languageRelation) => ({
					delete: {
						id: languageRelation.id,
					},
				})),
		],
	};

	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
					mutation ($volunteerId: UUID!, $data: VolunteerUpdateInput!) {
						updateVolunteer(by: {id: $volunteerId}, data: $data) {
							ok
							errorMessage
						}
					}
				`,
			variables: {
				data: updateInput,
				volunteerId,
			},
		}),
	});

	let ok: boolean;
	try {
		const json = await response.json();
		ok = response.ok && json?.data?.updateVolunteer?.ok;
	} catch (e) {
		console.warn("Unable to update volunteer:", e);
		ok = false;
	}

	res.status(200).json({
		ok,
		volunteer: await getVolunteerDetail(token, volunteerId),
	});
}
