import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const {
		offerId,
		offerStatus,
	} = req.body
	const cookies = new Cookies(req, res)

	const UpdateOfferResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${cookies.get('token')}`,
			},
			body: JSON.stringify({
				query: `
					mutation UpdateOffer($offerId: UUID!, $offerStatus: OfferStatusEnum!) {
						updateOffer(by: {id: $offerId}, data: {status: {connect: {type: $offerStatus}}}){
							ok
						}
					}
				`,
				variables: {
					offerId,
					offerStatus,
				},
			}),
		}
	)

	const json = await UpdateOfferResponse.json()
	const ok: boolean | undefined = json?.data?.signIn?.ok

	if (ok !== true) {
		console.warn('Failed to update offer status', json)
		res.status(400).json({
			ok: false,
			error: 'Neznámá chyba',
		})
		return
	}

	res.status(200).json({
		ok: true,
	})

}
