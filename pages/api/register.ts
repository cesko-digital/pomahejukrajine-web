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

type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'number' | 'date'

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
	userNote: string
	languages: string[],
	offers: {
		[id: string]: {
			questions: {
				[id: string]: QuestionValue
			}
		}
	}
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const data = req.body.data as RegisterFormState


	// TODO: Validation

	const createInput = {
		name: data.name,
		email: data.email,
		phone: data.phone === '+420' ? '' : data.phone,
		userNote: data.userNote,
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
