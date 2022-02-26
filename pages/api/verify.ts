import type { NextApiRequest, NextApiResponse } from 'next'


// 1. Check secret code and get email
// 2. Create user in tenant database
// 3. Save identityId to content database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const {
		password,
		secretCode,
		id,
	} = req.body


	// 1. Check secret code and get email
	const volunteerResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					query ($secretCode: String!, $id: UUID!) {
						volunteer: getVolunteer(by: {secretCode: $secretCode, id: $id}) {
							email
						}
					}
				`,
				variables: {
					secretCode,
					id,
				},
			}),
		}
	)

	const volunteerEmail: string | undefined = volunteerResponse.ok ? (await volunteerResponse.json())?.data?.volunteer?.email : undefined
	if (!volunteerEmail) {
		res.status(400).json({
			ok: false,
			error: 'Neplatný odkaz',
		})
		return
	}

	// 2. Create user in tenant database
	const userResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					mutation ($email: String!, $password: String!, $projectSlug: String!, $volunteerId: String!) {
						unmanagedInvite(email: $email, projectSlug: $projectSlug, memberships: [{ role: "volunteer", variables: [{ name: "volunteerId", values: [$volunteerId] }] }], options: { password: $password }) {
							ok
							error { code membershipValidation { code role variable } }

							result {
								isNew
								person {
									id
									identity { id }
								}
							}
						}
					}
				`,
				variables: {
					volunteerId: id,
					email: volunteerEmail,
					password,
					projectSlug: process.env.CONTEMBER_PROJECT_SLUG!,
				},
			}),
		}
	)
	const json = await userResponse.json()
	const ok: boolean | undefined = userResponse.ok && json?.data?.unmanagedInvite?.ok
	const identityId: string | undefined = json?.data?.unmanagedInvite?.result?.person?.identity?.id
	if (ok !== true || !identityId) {
		console.warn('Failed to create user', json)
		console.log(json?.data?.unmanagedInvite?.error?.code)
		console.log(json?.data?.unmanagedInvite?.error)
		res.status(400).json({
			ok: false,
			error: 'Nepodařilo se nastavit heslo',
		})
		return
	}

	// 3. Save identityId to content database
	const contentResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					mutation ($id: UUID!, $identityId: String!) {
						volunteer: updateVolunteer(by: {id: $id}, data: { verified: true, identityId: $identityId }) {
							ok
						}
					}
				`,
				variables: {
					id: id,
					identityId,
				},
			}),
		}
	)

	const contentOk: boolean | undefined = contentResponse.ok ? (await contentResponse.json())?.data?.volunteer?.ok : undefined
	if (contentOk !== true) {
		console.log(await contentResponse.json())
		res.status(400).json({
			ok: false,
			error: 'Nepodařilo se propojit uživatele',
		})
		return
	}

	res.status(200).json({
		ok: true,
	})
}
