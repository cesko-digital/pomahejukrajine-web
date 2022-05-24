import Link from "next/link";
import { useRouter } from "next/router";
import { Index, InstantSearch, Stats } from "react-instantsearch-dom";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export type OfferTypeListProps = {
	listOfferType: any;
	offerTypeId: string;
};

export const OfferTypeList = ({
	listOfferType,
	offerTypeId,
}: OfferTypeListProps) => {
	const { locale } = useRouter();

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
		<ul className="mt-8 flex flex-wrap justify-center gap-2">
			<InstantSearch
				indexName={`offers_${offerTypeId}`}
				searchClient={typesenseInstantsearchAdapter.searchClient}
			>
				{listOfferType.map(({ id, name, nameUK }: any) => {
					return (
						<Index indexName={`offers_${id}`} key={id}>
							<li key={id}>
								<Link href={`/nabidky/${id}`}>
									<a
										className={`border border-gray-200 py-2 px-6 rounded-full flex gap-2 ${
											offerTypeId === id
												? "bg-blue-600 text-white border-blue-800 shadow-sm hover:bg-blue-600"
												: ""
										}`}
									>
										{locale === "cs" ? name : nameUK}{" "}
										<Stats
											translations={{ stats: (nbHits) => `(${nbHits})` }}
										/>
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
