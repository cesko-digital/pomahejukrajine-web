import Link from "next/link";
import {
	CurrentRefinements,
	Highlight,
	Hits,
	InstantSearch,
	Pagination,
	RefinementList,
	SearchBox,
} from "react-instantsearch-hooks-web";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { parseIdFromFacetName } from "../lib/parseIdFromFacetName";

export type OfferSearchProps = {
	listQuestion: any[];
	offerTypeId: string;
	offerType: Record<string, any>;
};

export const OfferSearch = ({
	listQuestion,
	offerTypeId,
	offerType,
}: OfferSearchProps) => {
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
			query_by: [
				listQuestion
					.filter(
						(question: any) =>
							![
								"07d4ee81-3fa1-41df-a5f3-7a1e4c91777f",
								"8958a3e0-ef6f-4a51-9139-c26b7de8e8ef",
							].includes(question.id)
					)
					.map((question: any) => `parameter_${question.id}`),
			].join(","),
		},
	});

	return (
		<InstantSearch
			indexName={`offers_${offerTypeId}`}
			searchClient={typesenseInstantsearchAdapter.searchClient}
		>
			<SearchBox
				placeholder="Hledat nabídky"
				classNames={{
					input:
						"w-full max-w-lg mx-auto text-sm text-gray-900 placeholder-gray-500 border-gray-300 focus:border-gray-500",
					submit: "hidden",
					submitIcon: "hidden",
					loadingIcon: "hidden",
					reset: "hidden",
					resetIcon: "hidden",
					loadingIndicator: "hidden",
					form: "flex flex-col",
					root: "w-full mt-8",
				}}
			/>

			<CurrentRefinements
				classNames={{
					categoryLabel: "text-sm text-white",
					category:
						"border border-gray-200 py-1 px-3 rounded-full bg-blue-600 text-white border-blue-800 shadow-sm hover:bg-blue-600",
					delete: "text-white hover:text-red-600 ml-2",
					list: "flex flex-col gap-2",
					item: "flex items-center gap-2",
					root: "mt-4",
				}}
				transformItems={(it: any[]) => {
					return it.map((refinement) => ({
						...refinement,
						label:
							listQuestion.find(
								(it: any) =>
									it.id === parseIdFromFacetName(refinement.attribute)
							)?.label ?? refinement.label,
					}));
				}}
			/>

			<div>
				{listQuestion
					.filter((it: any) => ["district"].includes(it.type))
					.map((question: any) => (
						<div className="mt-6" key={question.id}>
							<div className="font-bold mb-2 text-center">{question.label}</div>
							<RefinementList
								key={question.id}
								attribute={`parameter_${question.id}_facet`}
								classNames={{
									list: "flex flex-wrap gap-2 justify-center",
									item: "border border-gray-200 py-2 px-6 rounded-full",
									checkbox: "w-4 h-4 mr-2",
									count:
										'text-sm text-gray-600 ml-2 after:content-[")"] before:content-["("]',
									showMore:
										"text-sm text-gray-600 mt-2 cursor-pointer hover:text-blue-600",
								}}
							/>
						</div>
					))}
			</div>

			<details className="py-4">
				<summary className="flex items-center font-bold">
					<h3 className="underline mt-8 text-blue-600 mx-auto hover:cursor-pointer">
						Podrobné filtry
					</h3>
				</summary>
				<div className="refinements text-center">
					{listQuestion
						.filter((it: any) => ["checkbox", "radio"].includes(it.type))
						.map((question: any) => (
							<div className="mt-6" key={question.id}>
								<div className="font-bold mb-2">{question.label}</div>
								<RefinementList
									key={question.id}
									attribute={`parameter_${question.id}_facet`}
									classNames={{
										list: "flex flex-wrap gap-2 justify-center",
										item: "border border-gray-200 py-2 px-6 rounded-full",
										checkbox: "w-4 h-4 mr-2",
										count:
											'text-sm text-gray-600 ml-2 after:content-[")"] before:content-["("]',
										showMore:
											"text-sm text-gray-600 mt-2 cursor-pointer hover:text-blue-600",
									}}
								/>
							</div>
						))}
				</div>
			</details>

			<Hits
				classNames={{
					list: "mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1",
				}}
				hitComponent={(hit: any) => {
					return (
						<div
							className="p-4 rounded-md border shadow-md m-4 flex flex-col"
							key={hit.hit.objectID}
						>
							<h3 className="text-lg font-bold">{offerType.name}</h3>
							{listQuestion.map((question: any) => (
								<div key={question.id} className="flex flex-col mt-2">
									{hit.hit[`parameter_${question.id}`] && (
										<>
											<p className="text-sm font-bold">{question.question}</p>
											<p className="text-sm">
												<Highlight
													attribute={`parameter_${question.id}`}
													hit={hit.hit}
												/>
											</p>
										</>
									)}
								</div>
							))}
							<div className="grow"></div>
							<div className="my-3">
								<Link
									href={{
										pathname: "/reagovat/[id]",
										query: { id: hit.hit.objectID! },
									}}
								>
									<a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
										Potřebuji tuto pomoc
									</a>
								</Link>
							</div>
							<div className="mt-2 text-xs text-gray-400 font-bold">
								{hit.hit.code}
							</div>
						</div>
					);
				}}
			/>
			<Pagination
				classNames={{
					list: "flex justify-center gap-4",
					selectedItem: "font-bold border-gray-600",
					item: "border border-gray-200 py-1 px-3 rounded-full",
				}}
				showFirst={false}
				showLast={false}
			/>
		</InstantSearch>
	);
};
