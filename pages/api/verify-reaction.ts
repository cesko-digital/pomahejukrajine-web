import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const {
		secretCode,
		id,
	} = req.body

	const update = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					mutation ($secretCode: String!, $id: UUID!) {
						updateReaction(by: {secretCode: $secretCode, id: $id}, data: { verified: true }) {
							ok
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

	const json = await update.json();
	const volunteerEmail: boolean | undefined = update.ok ? json?.data?.updateReaction?.ok : undefined
	if (!volunteerEmail) {
		console.log(json)
		res.status(400).json({
			ok: false,
			error: 'Nastala chyba při ověřování.',
		})
		return
	}

	res.status(200).json({
		ok: true,
	})
}
