import { useTranslation } from "next-i18next";
import Link from "next/link";
import {
	CurrentRefinements,
	Highlight,
	Hits,
	InstantSearch,
	Pagination,
	RefinementList,
	SearchBox,
	HierarchicalMenu,
} from "react-instantsearch-hooks-web";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { parseIdFromFacetName } from "../lib/parseIdFromFacetName";
import { useState } from "react";

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
	const [showFilters, setShowFilters] = useState(true);
	const { t } = useTranslation();
	const refinementClassnames = {
		item: "py-1",
		checkbox: "w-4 h-4 mr-2 mt-1 border-2 rounded-sm",
		label: "flex",
		labelText: "flex-1",
		// searchableRoot: "mt-4 mb-4",
		// searchableInput: "mt-4 mb-4",
		// searchableForm: "mt-4 mb-4",
		count: "text-sm text-gray-600 mt-0.5 ml-2",
		showMore: "text-sm text-gray-600 mt-2 cursor-pointer hover:text-blue-600",
	};
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
				placeholder={t("nabidky.search")}
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
			{!showFilters && (
				<div
					className="py-1.5 px-3 w-36 rounded-md md:border md:border-ua-blue text-center text-sm text-ua-blue md:hover:bg-ua-blue-dark md:hover:text-white"
					onClick={() => setShowFilters(true)}
				>
					Zobrazit filtry
				</div>
			)}
			<div className={"flex gap-x-16 text-grey-dark"}>
				{showFilters && (
					<div className={"w-80"}>
						<div className={"flex justify-between"}>
							<div className="font-bold text-left text-lg text-black">
								Filtry
							</div>
							<div
								className="mb-3 text-right text-ua-blue cursor-pointer"
								onClick={() => setShowFilters(false)}
							>
								Schovat filtry
							</div>
						</div>
						<div className="refinements text-left">
							{/*{listQuestion*/}
							{/*	.filter((it: any) => ["district"].includes(it.type))*/}
							{/*	.map((question: any) => {*/}
							{/*		console.log("Q", question);*/}
							{/*		return (*/}
							{/*			<div className="mt-6" key={question.id}>*/}
							{/*				<div className="font-bold mb-2 text-left">*/}
							{/*					{question.label}*/}
							{/*				</div>*/}
							{/*				<HierarchicalMenu*/}
							{/*					key={question.id}*/}
							{/*					attributes={[*/}
							{/*						`parameter_${question.id}_region_facet`,*/}
							{/*						`parameter_${question.id}_facet`]}*/}
							{/*					limit={50}*/}
							{/*					classNames={{*/}
							{/*						list: "",*/}
							{/*						item: "py-2 px-6",*/}
							{/*						count:*/}
							{/*							'text-sm text-gray-600 ml-2 after:content-[")"] before:content-["("]',*/}
							{/*						showMore:*/}
							{/*							"text-sm text-gray-600 mt-2 cursor-pointer hover:text-blue-600",*/}
							{/*					}}*/}
							{/*				/>*/}
							{/*			</div>*/}
							{/*		);*/}
							{/*	})}*/}
							{listQuestion
								.filter((it: any) => ["district"].includes(it.type))
								.map((question: any) => {
									return (
										<div className="pt-3 pb-3 border-t" key={question.id}>
											<details open>
												<summary className="font-bold cursor-pointer text-lg">
													Kraj
												</summary>
												<RefinementList
													key={question.id}
													attribute={`parameter_${question.id}_region_facet`}
													limit={20}
													classNames={refinementClassnames}
												/>
											</details>
										</div>
									);
								})}
							{listQuestion
								.filter((it: any) => ["district"].includes(it.type))
								.map((question: any) => {
									return (
										<div
											className="pt-3 pb-3 border-t border-b"
											key={question.id}
										>
											<details>
												<summary className="font-bold cursor-pointer text-lg">
													Okres
												</summary>
												<RefinementList
													key={question.id}
													searchablePlaceholder={"Vyhledávat"} //TODO: translate
													searchable={true}
													attribute={`parameter_${question.id}_facet`}
													limit={50}
													classNames={refinementClassnames}
												/>
											</details>
										</div>
									);
								})}
						</div>
						<div className="refinements text-left">
							{listQuestion
								.filter((it: any) => ["checkbox", "radio"].includes(it.type))
								.map((question: any) => (
									<div className="mt-3 pb-3 border-b" key={question.id}>
										<details>
											<summary className="font-bold cursor-pointer text-lg">
												{question.label}
											</summary>
											<RefinementList
												key={question.id}
												attribute={`parameter_${question.id}_facet`}
												classNames={refinementClassnames}
											/>
										</details>
									</div>
								))}
						</div>
					</div>
				)}
				<div className={`${showFilters && "w-fit"}`}>
					<Hits
						classNames={{
							list: "mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5",
						}}
						hitComponent={(hit: any) => {
							// if ((offerType.name != "Doprava")) {
							return (
								<div
									className="p-3 bg-card-grey flex flex-col"
									key={hit.hit.objectID}
								>
									<h3 className="text-lg font-bold">{offerType.name}</h3>
									{listQuestion.map((question: any) => (
										<div key={question.id} className="flex flex-col mt-2">
											{hit.hit[`parameter_${question.id}`] && (
												<>
													<p className="text-sm font-bold">
														{question.question}
													</p>
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
											<a className="px-4 py-2 bg-ua-blue hover:bg-ua-blue-dark text-white rounded-md text-sm">
												{t("nabidky.needThisHelp")}
											</a>
										</Link>
									</div>
									<div className="mt-2 text-xs text-gray-400 font-bold">
										{hit.hit.code}
									</div>
								</div>
							);
							// } else return null
						}}
					/>
					<Pagination
						classNames={{
							list: "flex justify-center gap-1 mt-14",
							selectedItem: "!bg-ua-blue !text-white",
							item: "border border-ua-blue text-ua-blue bg-blue-very-light py-1 px-3 rounded-md hover:bg-ua-blue-dark hover:text-white",
						}}
						showFirst={false}
						showLast={false}
					/>
				</div>
			</div>
		</InstantSearch>
	);
};
