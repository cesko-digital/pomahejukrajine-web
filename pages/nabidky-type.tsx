import { GetServerSidePropsContext } from "next/types";
import * as React from "react";
import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
	Snippet,
} from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
	server: {
		apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!,
		nodes: [
			{
				host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
				port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
				protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
			},
		],
		cacheSearchResultsForSeconds: 2 * 60,
	},
	additionalSearchParameters: {
		query_by: "parameter_966dffcb-ef24-4647-8fa6-c6a855efb02c",
	},
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Hit = ({ hit }: any) => {
	return <>{hit["parameter_f3f204fc-8716-48e2-a48e-7a42fec04275"]}</>;
};

export default () => {
	return (
		<InstantSearch
			indexName="offers_f42d07ed-10c4-47ec-bd26-615d6939a8b3"
			searchClient={searchClient}
		>
			<SearchBox />
			<Hits hitComponent={Hit} />
		</InstantSearch>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	//TODO: fetch offers by IDs to be able to get parameters id

	// const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL!, {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({
	// 		query: `query($id: UUID!) {
	// 					offer: getOffer(by: {id: $id}) {
	// 						id
	// 					}
	// 				}`,
	// 		variables: { id: "f42d07ed-10c4-47ec-bd26-615d6939a8b3" },
	// 	}),
	// })

	// const json = await response.json()
	// const { data } = json

	// return {
	// 	props: {
	// 		...data,
	// 	},
	// }

	return { props: {} };
}
