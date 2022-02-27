import type { NextApiRequest, NextApiResponse } from 'next'


interface QuestionDefinition {
	id: string
	question: string;
	type: QuestionType;
	required: boolean;
	options: {
		id: string;
		value: string;
		label: string;
		requireSpecification: boolean;
	}[]
}

type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'number' | 'date' | 'district'

interface QuestionValue {
	value?: string;
	specification?: string;
	values?: {
		value: string;
		specification?: string;
	}[];
}

interface RegisterFormProps {
	offerTypes: {
		id: string;
		name: string;
		infoText: string;
		questions: QuestionDefinition[];
	}[];
	districts: {
		id: string;
		name: string;
	}[];
}

interface RegisterFormState {
	name: string;
	organization: string,
	phone: string
	email: string
	contactHours: string,
	expertise: string
	languages: string[],
	offers: {
		[id: string]: {
			questions: {
				[id: string]: QuestionValue
			}
		}
	}
}

const fetchTypes = async (): Promise<RegisterFormProps> => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
			},
			body: JSON.stringify({
				query: `{
					offerTypes: listOfferType(orderBy: [{ order: asc }]) {
						id
						name
						infoText

						questions {
							id
							question
							type
							required
							options {
								id
								value
								label
								requireSpecification
							}
						}
					}

					languages: listLanguage(orderBy: [{ order: asc }]) {
						id
						name
					}

					districts: listDistrict(orderBy: [{name: asc}]) {
						id
						name
					}
				}`
			}),
		},
	)

	const { data, errors } = await response.json()
	return data
}

type Error = { input: 'question'; questionId: string; message: string } | { input: 'email'; message: string } | { input: 'offer'; message: string } | { input: 'languages'; message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const data = req.body.data as RegisterFormState

	const { offerTypes } = await fetchTypes()
	// TODO: Validation

	let errors: Error[] = []

	if (data.email.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/) === null) {
		errors.push({
			input: 'email',
			message: 'Neplatný email',
		})
	}

	if (data.languages.length === 0) {
		errors.push({
			input: 'languages',
			message: 'Musíte vybrat alespoň jeden jazyk',
		})
	}

	if (Object.keys(data.offers).length === 0) {
		errors.push({
			input: 'offer',
			message: 'Musíte vybrat alespoň jednu možnost',
		})
	}

	for (const [offerTypeId, offer] of Object.entries(data.offers)) {
		const offerType = offerTypes.find(({ id }) => id === offerTypeId)

		if (!offerType) {
			throw new Error(`Offer type ${offerTypeId} not found`)
		}

		for (const question of offerType.questions) {
			const value = offer.questions[question.id];
			if (question.required && !value) {
				errors.push({ input: "question", questionId: question.id, message: 'Povinná otázka' })
				continue
			}

			switch (question.type) {
				case 'district':
				case 'checkbox':
					if (question.required && (!value.values || value.values.filter(it => it.value).length === 0)) {
						errors.push({ input: "question", questionId: question.id, message: 'Povinná otázka' })
					}
					break
				case 'radio':
				case 'text':
				case 'textarea':
				case 'number':
				case 'date':
					if (question.required && !value.value) {
						errors.push({ input: "question", questionId: question.id, message: 'Povinná otázka' })
					}
					break
				default:
					throw new Error(`Unknown question type ${question.type}`)
			}

		}
	}

	if (errors.length) {
		res.status(400).json({ ok: false, errors })
		return
	}


	const createInput = {
		name: data.name,
		email: data.email,
		phone: data.phone === '+420' ? '' : data.phone,
		organization: data.organization,
		contactHours: data.contactHours,
		languages: data.languages.map(id => ({ create: { language: { connect: { id } } } })),
		expertise: data.expertise,
		offers: Object.entries(data.offers).map(([offerTypeId, offer]) => {
			const parameters = Object.entries(offer.questions).map(([questionId, question]) => {
				return {
					create: {
						question: { connect: { id: questionId } },
						value: question.value,
						specification: question.specification,
						values: question.values?.map(value => ({
							create: {
								value: value.value,
								specification: value.specification,
							}
						}))
					},
				}
			})
			return {
				create: {
					type: { connect: { id: offerTypeId } },
					parameters,
				}
			}
		}),
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
							mutation ($data: VolunteerCreateInput!) {
								createVolunteer(data: $data) {
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
	const ok: boolean | undefined = response.ok && json?.data?.createVolunteer?.ok
	if (ok !== true) {
		console.warn('Failed to create volunteer', json)
		console.log(json?.data?.createVolunteer?.error)
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
