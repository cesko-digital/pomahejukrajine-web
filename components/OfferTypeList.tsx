import Link from "next/link";
import { Index, InstantSearch } from "react-instantsearch-dom";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export type OfferTypeListProps = {
	listOfferType: any;
	offerTypeId: string;
	locale: string;
};

export const OfferTypeList = ({
	listOfferType,
	offerTypeId,
	locale,
}: OfferTypeListProps) => {
	const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
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
			query_by: "code",
		},
	});
	return (
		<ul className="mt-5 md:mt-12 grid grid-cols-1 gap-x-5 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2">
			<InstantSearch
				indexName={`offers_${offerTypeId}`}
				searchClient={typesenseInstantsearchAdapter.searchClient}
			>
				{listOfferType
					.filter((f: any) => !f.needsVerification)
					.map(({ id, name, nameUK }: any) => {
						return (
							<Index indexName={`offers_${id}`} key={id}>
								<li key={id}>
									<Link href={`/nabidky/${id}`}>
										<a
											href={
												locale === "cs"
													? `/nabidky/${id}`
													: `/${locale}/nabidky/${id}`
											}
											className={`border border-ua-blue py-2.5 px-6 rounded-lg flex ${
												offerTypeId === id
													? "bg-ua-blue text-white"
													: "bg-blue-very-light text-ua-blue"
											} hover:bg-ua-blue-dark hover:border-ua-blue-dark hover:text-white`}
										>
											{locale === "cs" ? name : nameUK}
										</a>
									</Link>
								</li>
							</Index>
						);
					})}
			</InstantSearch>
		</ul>
	);
};
