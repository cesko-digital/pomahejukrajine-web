export interface ReactionForm {
	email: string;
	text?: string;
	phone: string;
}

export interface ReactionPayload extends ReactionForm {
	offerId: string;
}
