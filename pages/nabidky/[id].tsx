import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";

import Header from "../../components/header";
import { Meta } from "../../components/Meta";
import { OfferEmpty } from "../../components/OfferEmpty";
import { OfferSearch } from "../../components/OfferSearch";

const Offers = (props: any) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Nabídky pomoci - Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<ul className="mt-8 flex flex-wrap justify-center gap-2">
					{props.listOfferType.map(({ id, name }: any) => (
						<li key={id}>
							<a
								href={`/nabidky/${id}`}
								className={`border border-gray-200 py-2 px-6 rounded-full block ${
									props.offerTypeId === id
										? "bg-blue-600 text-white border-blue-800 shadow-sm hover:bg-blue-600"
										: ""
								}`}
							>
								{name}
							</a>
						</li>
					))}
				</ul>

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
