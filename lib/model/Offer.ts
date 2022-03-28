export type Offer = {
	id: string;
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
