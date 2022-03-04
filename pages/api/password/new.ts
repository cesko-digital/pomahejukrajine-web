import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		token,
		password,
	} = req.body

	const resetPassword = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					mutation($password: String!, $token: String!) {
						resetPassword(token: $token, password: $password){
							ok
							error {
								code
								developerMessage
							}
						}
					}
				`,
				variables: {
					token,
					password,
				},
			}),
		}
	)

	const json = await resetPassword.json()
	const ok: boolean | undefined = json?.data?.resetPassword?.ok

	const errorMessage = {
		PERSON_NOT_FOUND: 'E-mail neexistuje',
		UNKNOWN_EMAIL: 'E-mail neexistuje',
		INVALID_PASSWORD: 'Neplatné heslo',
		PASSWORD_TOO_WEAK: 'Heslo je příliš slabé (musí mít alespoň 6 znaků)',
	}

	if (ok !== true) {
		console.warn('Failed to create user', json)
		const errorCode: 'PERSON_NOT_FOUND' | 'UNKNOWN_EMAIL' | 'INVALID_PASSWORD' = json?.data?.resetPassword?.error?.code
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
