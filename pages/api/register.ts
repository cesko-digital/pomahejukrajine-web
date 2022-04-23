import type { NextApiRequest, NextApiResponse } from "next";
import generateUniqueCode from "../../lib/generateUniqueCode";
import {
	FormError,
	publicQuery,
	PublicQueryResult,
	RegisterFormState,
} from "../../lib/shared";
import { validateOffer } from "../../lib/validateOffer";

const fetchTypes = async (): Promise<PublicQueryResult> => {
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

	const { data, errors } = await response.json();
	return data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const data = req.body.data as RegisterFormState;

	const { offerTypes = [] } = (await fetchTypes()) || {};

	const errors: FormError[] = [];

	if (data.email.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/) === null) {
		errors.push({
			input: "email",
			message: "Neplatný email",
		});
	}

	if (data.email !== data.emailRepeat) {
		errors.push({
			input: "emailRepeat",
			message: "Emaily nejsou shodné",
		});
	}

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

	if (Object.keys(data.offers).length === 0) {
		errors.push({
			input: "offer",
			message: "Musíte vybrat alespoň jednu možnost",
		});
	}

	for (const [offerTypeId, offer] of Object.entries(data.offers)) {
		const offerType = offerTypes.find(({ id }) => id === offerTypeId);

		if (!offerType) {
			throw new Error(`Offer type ${offerTypeId} not found`);
		}
		errors.push(...validateOffer(offerType, offer.questions));
	}

	if (errors.length) {
		res.status(400).json({ ok: false, errors });
		return;
	}

	const sendRegisterRequest = async (attempt: number): Promise<any> => {
		if (attempt > 10) {
			res.status(400).json({
				ok: false,
				error: "Nepodařilo se uložit",
			});
			return;
		}

		const createInput = {
			name: data.name,
			email: data.email,
			phone: data.phone === "+420" ? "" : data.phone,
			organization: data.organization,
			contactHours: data.contactHours,
			languages: data.languages.map((id) => ({
				create: { language: { connect: { id } } },
			})),
			expertise: data.expertise,
			offers: Object.entries(data.offers).map(([offerTypeId, offer]) => {
				const parameters = Object.entries(offer.questions).map(
					([questionId, question]) => {
						if (question.type === "district") {
							return {
								create: {
									question: { connect: { id: questionId } },
									value: question.value,
									specification: question.specification,
									values: question.values?.map((value) => ({
										create: {
											value: value.value,
											specification: value.specification,
											district: { connect: { name: value.value } },
										},
									})),
								},
							};
						} else if (
							question.type === "number" &&
							question.value &&
							!isNaN(parseInt(question.value))
						) {
							return {
								create: {
									question: { connect: { id: questionId } },
									value: question.value,
									numericValue: parseInt(question.value),
									specification: question.specification,
									values: question.values?.map((value) => ({
										create: {
											value: value.value,
											specification: value.specification,
										},
									})),
								},
							};
						} else {
							return {
								create: {
									question: { connect: { id: questionId } },
									value: question.value,
									specification: question.specification,
									values: question.values?.map((value) => ({
										create: {
											value: value.value,
											specification: value.specification,
										},
									})),
								},
							};
						}
					}
				);
				return {
					create: {
						type: { connect: { id: offerTypeId } },
						code: generateUniqueCode(6),
						parameters,
					},
				};
			}),
		};

		const response = await fetch(
			process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
				},
				body: JSON.stringify({
					query: `
								mutation ($data: VolunteerCreateInput!) {
									createVolunteer(data: $data) {
										ok
										errorMessage
									}
								}
							`,
					variables: {
						data: createInput,
					},
				}),
			}
		);

		const json = await response.json();
		const ok: boolean | undefined =
			response.ok && json?.data?.createVolunteer?.ok;
		if (ok !== true) {
			console.warn("Failed to create volunteer", json);
			if (
				json?.data?.createVolunteer?.errorMessage.includes(
					"offers.0.code: UniqueConstraintViolation"
				)
			) {
				return await sendRegisterRequest(attempt + 1);
			}
			res.status(400).json({
				ok: false,
				error: "Nepodařilo se uložit",
			});
			return;
		}

		res.status(200).json({
			ok: true,
			createInput,
		});
	};

	return await sendRegisterRequest(1);
}
