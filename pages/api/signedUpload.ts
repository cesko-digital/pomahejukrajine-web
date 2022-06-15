import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import {
	FormError,
	getVolunteerDetail,
	listVolunteerIds,
} from "../../lib/shared";

export type SignedUpload = {
	url: string;
	publicUrl: string;
	method: string;
	headers: {
		key: string;
		value: string;
	}[];
} | null;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const data = req.body;
	const errors: FormError[] = [];

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

	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
		},
		body: JSON.stringify({
			query: `
					mutation($contentType: String!) {
						signedUpload: generateUploadUrl(contentType: $contentType) {
							url
							publicUrl
							method
							headers {
									key
									value
							}
						}
					}
				`,
			variables: {
				contentType: data.contentType,
			},
		}),
	});

	let ok: boolean;
	let signedUpload: SignedUpload = null;

	try {
		ok = response.ok;
		const json = await response.json();
		signedUpload = json?.data?.signedUpload;
	} catch (e) {
		console.warn("Unable to update volunteer:", e);
		ok = false;
	}

	res.status(200).json({
		ok,
		signedUpload,
	});
}
