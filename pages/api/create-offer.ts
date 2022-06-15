import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	FormError,
	OfferParameters,
	publicQuery,
	PublicQueryResult,
} from "../../lib/shared";
import { validateOffer } from "../../lib/validateOffer";
import generateUniqueCode from "../../lib/generateUniqueCode";

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

	const { data } = await response.json();
	return data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const cookies = new Cookies(req, res);
	const volunteerId = req.body.volunteerId as string;
	const data = req.body.data as { offer: OfferParameters };
	const { offerTypes = [] } = (await fetchTypes()) || {};
	const isUKLanguage = req.body.isUKLanguage as boolean;

	const errors: FormError[] = [];
	if (Object.keys(data).length === 0) {
		errors.push({
			input: "offer",
			message: "Musíte vybrat alespoň jednu možnost",
		});
	}

	const offerList = Object.entries(data).map(([offerTypeId, offer]) => {
		const offerType = offerTypes.find(({ id }) => id === offerTypeId);
		if (!offerType) {
			throw new Error(`Offer type ${offerTypeId} not found`);
		}
		const offerParams: OfferParameters | any = offer.questions;

		errors.push(...validateOffer(offerType, offerParams, isUKLanguage));
		if (errors.length) {
			res.status(400).json({ ok: false, errors });
		}
		const parameters = Object.entries(offer.questions).map(
			([questionId, question]) => {
				if (question.type === "district") {
					return {
						question: { connect: { id: questionId } },
						value: question.value,
						specification: question.specification,
						values: question.values?.map((value: any) => ({
							create: {
								value: value.value,
								specification: value.specification,
								district: { connect: { name: value.value } },
							},
						})),
					};
				} else if (
					question.type === "number" &&
					question.value &&
					!isNaN(parseInt(question.value))
				) {
					return {
						question: { connect: { id: questionId } },
						value: question.value,
						numericValue: parseInt(question.value),
						specification: question.specification,
						values: question.values?.map((value: any) => ({
							create: {
								value: value.value,
								specification: value.specification,
							},
						})),
					};
				} else {
					return {
						question: { connect: { id: questionId } },
						value: question.value,
						specification: question.specification,
						values: question.values?.map((value: any) => ({
							create: {
								value: value.value,
								specification: value.specification,
							},
						})),
					};
				}
			}
		);
		return {
			type: { connect: { id: offerTypeId } },
			code: generateUniqueCode(6),
			parameters,
		};
	});

	if (res.statusCode == 400) {
		return;
	}

	const createInputs = offerList.map((offer) => {
		return {
			volunteer: { connect: { id: volunteerId } },
			type: offer?.type,
			code: offer?.code,
			parameters: offer?.parameters.map((p) => {
				return { create: { ...p } };
			}),
		};
	});

	for (let createInput of createInputs) {
		const response = await fetch(
			process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("token")}`,
				},
				body: JSON.stringify({
					query: `
							mutation ($data: OfferCreateInput!) {
								createOffer(data: $data) {
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
		const json = await response?.json();
		const ok: boolean | undefined = response?.ok && json?.data?.createOffer?.ok;
		if (ok !== true) {
			console.warn("Failed to create offer", json);
			res.status(400).json({
				ok: false,
				error: "Nepodařilo se uložit",
			});
			return;
		}

		res.status(200).json({
			ok: true,
		});
	}
}
