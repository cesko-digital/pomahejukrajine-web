export type Offer = {
	id: string;
	code: string;
	allowReaction: boolean;
	type: {
		id: string;
	};
	parameters: {
		id: string;
		question: {
			id: string;
		};
		value: string;
		specification?: string;
		values: {
			id: string;
			value: string;
			specification: string;
		}[];
	}[];
};
