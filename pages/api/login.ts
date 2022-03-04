import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		email,
		password,
	} = req.body
	const cookies = new Cookies(req, res)


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
					mutation SignIn($email: String!, $password: String!) {
						signIn(email: $email, password: $password) {
							ok
							error {
								code
								developerMessage
							}
							result {
								token
							}
						}
					}
				`,
				variables: {
					email,
					password,
				},
			}),
		}
	)

	const json = await signInResponse.json()
	const ok: boolean | undefined = json?.data?.signIn?.ok
	const token: string | undefined = json?.data?.signIn?.result?.token

	const errorMessage = {
		UNKNOWN_EMAIL: 'E-mail neexistuje',
		INVALID_PASSWORD: 'Neplatné heslo',
	}

	if (ok !== true || !token) {
		console.warn('Failed to create user', json)
		const errorCode: 'UNKNOWN_EMAIL' | 'INVALID_PASSWORD' = json?.data?.signIn?.error?.code
		res.status(400).json({
			ok: false,
			error: errorCode ? errorMessage[errorCode] : 'Neznámá chyba',
		})
		return
	}

	cookies.set('token', token, {
		httpOnly: true, // true by default
		maxAge: 60 * 60 * 24 * 100
	})

	res.status(200).json({
		ok: true,
	})

}
