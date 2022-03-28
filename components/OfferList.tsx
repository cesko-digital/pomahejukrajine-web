import Link from "next/link";
import React, { Fragment } from "react";
import { Offer } from "../lib/model/Offer";
import { OfferType, QuestionDefinition } from "../lib/shared";

const OfferParameter: React.FC<{
	parameter: Offer["parameters"][0];
	question: QuestionDefinition;
}> = ({ parameter, question }) => {
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
};

const OfferList: React.FC<{
	offersToShow: Offer[];
	offerTypes: OfferType[];
}> = ({ offersToShow, offerTypes }) => {
	return (
		<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{offersToShow.map((offer) => {
				const offerType = offerTypes.find((it) => it.id === offer.type.id);
				if (!offerType) return null;
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
								<OfferParameter
									key={parameter.id}
									parameter={parameter}
									question={question}
								/>
							);
						})}

						{offer.allowReaction && (
							<>
								<div className="grow"></div>
								<div className="my-3">
									<Link
										href={{
											pathname: "/reagovat/[id]",
											query: { id: offer.id },
										}}
									>
										<a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
											Potřebuji tuto pomoc
										</a>
									</Link>
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default OfferList;
