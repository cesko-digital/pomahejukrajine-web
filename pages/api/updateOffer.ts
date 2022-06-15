import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	FormError,
	OfferParameters,
	publicQuery,
	PublicQueryResult,
} from "../../lib/shared";
import { validateOffer } from "../../lib/validateOffer";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const cookies = new Cookies(req, res);
	const offerId = req.body.offerId as string;
	const data = req.body.data as OfferParameters;
	const isUKLanguage = req.body.isUKLanguage as boolean;

	const baseDataResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("token")}`,
			},
			body: JSON.stringify({
				query: `query ($id: UUID!) {
					${publicQuery}
					offer: getOffer(by: { id: $id }) {
						type { id }
						parameters { question { id } values { id } }
					}
				}`,
				variables: {
					id: offerId,
				},
			}),
		}
	);

	const baseDataJson = await baseDataResponse.json();
	if (baseDataJson.errors) {
		throw new Error("Unable to fetch base data");
	}
	const { offerTypes, offer } = baseDataJson.data as PublicQueryResult & {
		offer?: {
			type: { id: string };
			parameters: { question: { id: string }; values: { id: string }[] }[];
		};
	};

	if (!offer) {
		throw new Error(`Offer not found`);
	}

	const offerTypeId = offer.type.id;
	const offerType =
		offerTypeId !== undefined
			? offerTypes.find((type) => type.id === offerTypeId)
			: undefined;

	const errors: FormError[] = [];

	if (!offerType) {
		throw new Error(`Offer type ${offerTypeId} not found`);
	}
	errors.push(...validateOffer(offerType, data, isUKLanguage));

	if (errors.length) {
		res.status(400).json({ ok: false, errors });
		return;
	}

	const updateInput = {
		parameters: Object.entries(data).map(([questionId, question]) => {
			const prevValues =
				offer.parameters
					.find((parameter) => parameter.question.id === questionId)
					?.values.map((value) => value.id) ?? [];
			const data = {
				question: { connect: { id: questionId } },
				value: question.value,
				valueUK: question.valueUK,
				specification: question.specification,
				specificationUK: question.specificationUK,
			};

			if (question.type === "district") {
				Object.assign(data, {
					values: [
						...prevValues.map((value) => ({ delete: { id: value } })),
						...(question.values?.map((value) => ({
							create: {
								value: value.value,
								valueUK: value.valueUK,
								specification: value.specification,
								specificationUK: value.specificationUK,
								district: {
									connect: isUKLanguage
										? { nameUK: value.value }
										: { name: value.value },
								},
							},
						})) ?? []),
					],
				});
			} else if (
				question.type === "number" &&
				question.value &&
				!isNaN(parseInt(question.value))
			) {
				Object.assign(data, {
					numericValue: parseInt(question.value),
				});
			} else {
				Object.assign(data, {
					values: [
						...prevValues.map((value) => ({ delete: { id: value } })),
						...(question.values?.map((value) => ({
							create: {
								value: value.value,
								valueUK: value.valueUK,
								specification: value.specification,
								specificationUK: value.specificationUK,
							},
						})) ?? []),
					],
				});
			}

			if (prevValues.length > 0) {
				return {
					update: {
						by: {
							question: { id: questionId },
						},
						data,
					},
				};
			}

			return {
				upsert: {
					by: {
						question: { id: questionId },
					},
					update: data,
					create: data,
				},
			};
		}),
	};

	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
							mutation ($offerId: UUID!, $data: OfferUpdateInput!) {
								updateOffer(by: { id: $offerId }, data: $data) {
									ok
									errorMessage
								}
							}
						`,
			variables: {
				offerId,
				data: updateInput,
			},
		}),
	});

	const json = await response.json();
	const ok: boolean | undefined = response.ok && json?.data?.updateOffer?.ok;
	if (ok !== true) {
		console.warn("Failed to update offer", json);
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
