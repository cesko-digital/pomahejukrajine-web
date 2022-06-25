import { FormError, OfferType, QuestionValue } from "./shared";

export function validateOffer(
	offerType: OfferType,
	parameters: { [p: string]: QuestionValue },
	isUKLanguage: boolean
): FormError[] {
	const errors: FormError[] = [];

	for (const question of offerType.questions) {
		const value = parameters[question.id];
		if (question.required && !value) {
			errors.push({
				input: "question",
				questionId: question.id,
				code: "error.requiredQuestion",
			});
			continue;
		}

		switch (question.type) {
			case "district":
			case "checkbox":
				if (
					question.required &&
					(!value.values || value.values.filter((it) => it.value).length === 0)
				) {
					errors.push({
						input: "question",
						questionId: question.id,
						code: "error.requiredQuestion",
					});
				}
				break;
			case "radio":
			case "number":
			case "date":
				if (question.required && !value.value) {
					errors.push({
						input: "question",
						questionId: question.id,
						code: "error.requiredQuestion",
					});
				}
				break;
			case "text":
			case "image":
			case "textarea":
				if (question.required && !value[isUKLanguage ? "valueUK" : "value"]) {
					console.log(
						isUKLanguage,
						value,
						value[isUKLanguage ? "valueUK" : "value"]
					);

					errors.push({
						input: "question",
						questionId: question.id,
						code: "error.requiredQuestion",
					});
				}
				break;
			default:
				throw new Error(`Unknown question type ${question.type}`);
		}
	}

	return errors;
}
