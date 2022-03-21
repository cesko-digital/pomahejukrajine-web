import Link from "next/link";
import { Fragment } from "react";
import { OfferType } from "../lib/shared";

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

const OfferCard: React.FC<{ offer: Offer; offerType: OfferType }> = ({
	offer,
	offerType,
}) => {
	return (
		<div
			key={offer.id}
			className="p-4 rounded-md border shadow-md m-4 flex flex-col"
		>
			<h3 className="text-lg font-bold">{offerType.name}</h3>
			{offer.parameters.map((parameter) => {
				const question = offerType.questions.find(
					(it) => it.id === parameter.question.id
				)!;
				return (
					<div key={parameter.id} className="flex flex-col mt-2">
						<p className="text-sm font-bold">{question.question}</p>
						<p className="text-sm">
							{question.type === "district" || question.type === "checkbox" ? (
								<>
									{parameter.values.map((value, i) => {
										const isLast = i === parameter.values.length - 1;
										const requiresSpecification =
											question.type === "checkbox" &&
											(question.options.find((it) => it.value === value.value)
												?.requireSpecification ??
												false);
										return (
											<Fragment key={value.id}>
												<span>
													{value.value}
													{requiresSpecification && ` (${value.specification})`}
												</span>
												{!isLast && ", "}
											</Fragment>
										);
									})}
								</>
							) : question.type === "radio" ? (
								<>
									{parameter.value}
									{(question.options.find((it) => it.value === parameter.value)
										?.requireSpecification ??
										false) &&
										` (${parameter.specification})`}
								</>
							) : question.type === "date" ? (
								<>
									{parameter.value} {/* TODO */}
								</>
							) : (
								<>{parameter.value}</>
							)}
						</p>
					</div>
				);
			})}

			{offer.allowReaction && (
				<>
					<div className="grow"></div>
					<div className="mt-3">
						<Link
							href={{ pathname: "/reagovat/[id]", query: { id: offer.id } }}
						>
							<a className="px-2 py-1 bg-indigo-600 text-white rounded-md text-sm">
								Potřebuji tuto pomoc
							</a>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default OfferCard;
