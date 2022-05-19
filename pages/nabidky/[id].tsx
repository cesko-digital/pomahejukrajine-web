import { GetServerSidePropsContext } from "next/types";
import * as React from "react";
import { Stats, InstantSearch, Index } from "react-instantsearch-dom";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

import Header from "../../components/header";
import { Meta } from "../../components/Meta";
import { OfferEmpty } from "../../components/OfferEmpty";
import { OfferSearch } from "../../components/OfferSearch";
import { OfferTypeList } from "../../components/OfferTypeList";

const Offers = (props: any) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Nabídky pomoci - Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<OfferTypeList {...props} />
				{!props.listQuestion.length ? (
					<OfferEmpty />
				) : (
					<>
						<hr className="my-8" />
						<OfferSearch
							listQuestion={props.listQuestion}
							offerTypeId={props.offerTypeId}
							offerType={props.offerType}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Offers;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env
				.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN!}`,
		},
		body: JSON.stringify({
			query: `
				query ($id: UUID!) {
					offerType: getOfferType(by: { id: $id }) {
						name
					}
					listOfferType(orderBy: { order: asc }) {
						id
						name
						paginateOffers {
							pageInfo {
								totalCount
							}
						}
					}
					listQuestion(filter: { offerType: { id: { eq: $id } }, public: { eq: true } }, orderBy: { order: asc }) {
						id
						label
						type
						question
						options {
							label
							value
						}
					}
				}
			`,
			variables: { id: context.query.id },
		}),
	});

	const json = await response.json();
	const { data } = json;

	return {
		props: {
			...data,
			offerTypeId: context.query.id,
		},
	};
}
