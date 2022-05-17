export interface QuestionDefinition {
	id: string;
	question: string;
	type: QuestionType;
	required: boolean;
	options: {
		id: string;
		value: string;
		label: string;
		requireSpecification: boolean;
	}[];
}

export type QuestionType =
	| "radio"
	| "checkbox"
	| "text"
	| "textarea"
	| "number"
	| "date"
	| "district";

export interface QuestionValue {
	value?: string;
	type?: string;
	specification?: string;
	values?: {
		value: string;
		specification?: string;
	}[];
}

export type Districts = {
	id: string;
	name: string;
	region: {
		id: string;
		name: string;
	};
}[];

export type Language = {
	id: string;
	name: string;
};

export type OfferType = {
	id: string;
	name: string;
	nameUK: string;
	infoText: string;
	questions: QuestionDefinition[];
	needsVerification: boolean;
	hideInDemand: boolean;
};

export interface PublicQueryResult {
	offerTypes: OfferType[];
	districts: Districts;
	languages: Language[];
	uk?: boolean;
}

export type OfferParameters = {
	[id: string]: QuestionValue;
};

export interface RegisterFormState {
	name: string;
	organization: string;
	phone: string;
	email: string;
	emailRepeat: string;
	contactHours: string;
	expertise: string;
	languages: string[];
	offers: {
		[id: string]: {
			questions: OfferParameters;
		};
	};
}

export type Volunteer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	organization: string;
	contactHours: string;
	expertise: string;
	verified: boolean;
	banned: boolean;
	languages: {
		language: {
			id: string;
			name: string;
		};
	}[];
};

export type EditVolunteerFormState = Omit<
	RegisterFormState,
	"email" | "emailRepeat" | "offers"
	>;

export interface VolunteerDetailResult {
	name: string;
	organization: string;
	phone: string;
	contactHours: string;
	expertise: string;
	languages: {
		id: string;
		language: Language;
	}[];
}

export interface HelpFormState {
	name: string;
	phone: string;
	email: string;
	contactHours: string;
	otherType: string;
	types: string[];
}

export type FormError =
	| { input: "question"; questionId: string; message: string }
	| { input: "email"; message: string }
	| { input: "emailRepeat"; message: string }
	| { input: "offer"; message: string }
	| { input: "languages"; message: string }
	| { input: "phone"; message: string };

export type ErrorMultilingual =
	| { input: "email"; message: { cs: string; uk: string } }
	| { input: "offer"; message: { cs: string; uk: string } };

export const publicQuery = `
	offerTypes: listOfferType(orderBy: [{ order: asc }]) {
		id
		name
		nameUK
		infoText
		needsVerification
		hideInDemand

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
		nameUK

		region {
			id
			name
		}
	}
`;

export const listVolunteerIds = async (
	token: string
): Promise<false | undefined | string[]> => {
	const tenantResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `query {
					me {
						projects {
							memberships {
								role
								variables {
									name
									values
								}
							}
							project {
								slug
							}
						}
					}
				}
			`,
			}),
		}
	).then(async (response) => {
		if (response.status !== 200) {
			return "error";
		} else {
			return response.json();
		}
	});

	if (tenantResponse === "error") {
		return false;
	}

	const tenantData = await tenantResponse;

	return tenantData.data.me.projects
		.find((it: { project: { slug: string } }) => it.project.slug === "ukrajina")
		?.memberships?.find((it: { role: string }) => it.role === "volunteer")
		?.variables.find((it: { name: string }) => it.name === "volunteerId")
		.values;
};

export const getVolunteerDetail = async (
	token: string,
	volunteerId: string
): Promise<VolunteerDetailResult | null> => {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: `query($volunteerId: UUID!) {
					getVolunteer(by: { id: $volunteerId }) {
						name
						languages {
							id
							language {
								id
								name
							}
						}
						phone
						organization
						contactHours
						expertise
					}
				}
			`,
			variables: {
				volunteerId,
			},
		}),
	});

	if (response.status !== 200) {
		return null;
	}

	try {
		return (await response.json()).data.getVolunteer;
	} catch (e) {
		return null;
	}
};
