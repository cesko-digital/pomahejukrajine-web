import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		email,
	} = req.body

	const signInResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_LOGIN_TOKEN}`,
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
	)

	const json = await signInResponse.json()
	const ok: boolean | undefined = json?.data?.createResetPasswordRequest?.ok

	const errorMessage = {
		PERSON_NOT_FOUND: 'E-mail neexistuje',
		UNKNOWN_EMAIL: 'E-mail neexistuje',
		INVALID_PASSWORD: 'Neplatné heslo',
	}

	if (ok !== true) {
		console.warn('Failed to create user', json)
		const errorCode: 'PERSON_NOT_FOUND' | 'UNKNOWN_EMAIL' | 'INVALID_PASSWORD' = json?.data?.createResetPasswordRequest?.error?.code
		res.status(400).json({
			ok: false,
			error: errorCode ? errorMessage[errorCode] : 'Neznámá chyba',
		})
		return
	}

	res.status(200).json({
		ok: true,
	})

}
