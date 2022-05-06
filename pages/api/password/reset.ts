import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { email } = req.body;

	const signInResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.CONTEMBER_LOGIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					mutation($email: String!) {
						createResetPasswordRequest(email: $email){
							ok
							error {
								code
								developerMessage
							}
						}
					}
				`,
				variables: {
					email,
				},
			}),
		}
	);

	const json = await signInResponse.json();
	const ok: boolean | undefined = json?.data?.createResetPasswordRequest?.ok;

	const errorMessage = {
		PERSON_NOT_FOUND: "E-mail neexistuje",
		UNKNOWN_EMAIL: "E-mail neexistuje",
		INVALID_PASSWORD: "Neplatné heslo",
	};

	if (ok !== true) {
		const isNotVerifiedUser = await fetch(
			process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
				},
				body: JSON.stringify({
					query: `query($email: String!) {
							listVolunteer(filter: { email: { eq: $email } }) {
								id
							}
						}
					`,
					variables: {
						email,
					},
				}),
			}
		);
		const isNotVerifiedUserData = await isNotVerifiedUser.json();
		if (isNotVerifiedUserData?.data?.listVolunteer?.length > 0) {
			const userId = isNotVerifiedUserData.data.listVolunteer[0].id;
			const resetPasswordResponse = await fetch(
				process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
					},
					body: JSON.stringify({
						query: `
							mutation($userId: UUID!) {
								updateVolunteer(by: { id: $userId }
									data: {
										verified: false
										secretCode: null
									}
								) {
									ok
									errorMessage
								}
							}
						`,
						variables: {
							userId,
						},
					}),
				}
			);
			const resetPasswordResponseData = await resetPasswordResponse.json();
			if (resetPasswordResponseData?.data?.updateVolunteer?.ok) {
				res.status(200).json({
					ok: true,
				});
			}
		}

		console.warn("Failed to create user", json);
		const errorCode: "PERSON_NOT_FOUND" | "UNKNOWN_EMAIL" | "INVALID_PASSWORD" =
			json?.data?.createResetPasswordRequest?.error?.code;
		res.status(400).json({
			ok: false,
			error: errorCode ? errorMessage[errorCode] : "Neznámá chyba",
		});
		return;
	}

	res.status(200).json({
		ok: true,
	});
}
