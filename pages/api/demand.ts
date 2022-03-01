import type { NextApiRequest, NextApiResponse } from 'next'
import { PublicQueryResult, HelpFormState, publicQuery, ErrorMultilingual } from '../../lib/shared'

const fetchTypes = async (): Promise<PublicQueryResult> => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
			},
			body: JSON.stringify({
				query: `{ ${publicQuery} }`
			}),
		},
	)

	const { data, errors } = await response.json()
	return data
}


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const data = req.body.data as HelpFormState

	const { offerTypes } = await fetchTypes()
	// TODO: Validation

	let errors: ErrorMultilingual[] = []

	if (data.email.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/) === null) {
		errors.push({
			input: 'email',
			message: { cs: 'Neplatný email', uk: 'Недійсна електронна адреса' },
		})
	}

	if (Object.keys(data.types).length === 0 && data.otherType === '') {
		errors.push({
			input: 'offer',
			message: { cs: 'Musíte vybrat alespoň jednu možnost', uk: 'Ви повинні вибрати принаймні один варіант' },
		})
	}

	if (errors.length) {
		res.status(400).json({ ok: false, errors })
		return
	}

	const createInput = {
		name: data.name,
		email: data.email,
		phone: data.phone === '+380' ? '' : data.phone,
		contactHours: data.contactHours,
		otherType: data.otherType,
		types: data.types.map(typeId => ({ connect: { id: typeId } })),
	}

	const response = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
							mutation ($data: DemandCreateInput!) {
								createDemand(data: $data) {
									ok
									errorMessage
								}
							}
						`,
				variables: {
					data: createInput,
				},
			}),
		},
	)


	const json = await response.json()

	const ok: boolean | undefined = response.ok && json?.data?.createDemand?.ok
	if (ok !== true) {
		console.warn('Failed to create demand', json)
		console.log(json?.data?.createDemand?.error)
		res.status(400).json({
			ok: false,
			error: 'Nepodařilo se uložit',
		})
		return
	}

	res.status(200).json({
		ok: true,
	})
}
