import type { NextApiRequest, NextApiResponse } from "next";
import { FormError } from "../../lib/shared";
import { ReactionPayload } from "../../lib/reaction";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const data = req.body.data as ReactionPayload;

	// TODO: Validation

	let errors: FormError[] = [];

	if (data.email.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/) === null) {
		errors.push({
			input: "email",
			code: "error.invalidEmail",
		});
	}

	if (errors.length) {
		res.status(400).json({ ok: false, errors });
		return;
	}

	const createInput = {
		offer: { connect: { id: data.offerId } },
		email: data.email,
		phone: data.phone === "+420" ? "" : data.phone,
	};

	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
					mutation ($data: ReactionCreateInput!) {
						createReaction(data: $data) {
							ok
							errorMessage
						}
					}
				`,
			variables: {
				data: createInput,
			},
		}),
	});

	const json = await response.json();
	const ok: boolean | undefined = response.ok && json?.data?.createReaction?.ok;
	if (ok !== true) {
		console.warn("Failed to create reaction", json);
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
