export interface ReactionForm {
	email: string;
	phone: string;
}

export interface ReactionPayload extends ReactionForm {
	offerId: string;
}
