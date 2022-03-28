import { QuestionType } from "../shared";

export interface FilterWithCount {
	id: string;
	type: QuestionType;
	question: string;
	optionGroups?: {
		id: string;
		label: string;
		options: string[];
		count: number;
	}[];
	options: { id: string; label: string; count: number }[];
}

export type QuestionFilter = { [questionId: string]: string[] };
