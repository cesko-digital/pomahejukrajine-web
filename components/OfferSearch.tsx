import { useTranslation } from "next-i18next";
import Link from "next/link";
import {
	Highlight,
	Hits,
	InstantSearch,
	Pagination,
	RefinementList,
	SearchBox,
} from "react-instantsearch-hooks-web";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import React, { useState } from "react";
import styles from "./OfferSearch.module.css";
import cx from "classnames";
import FilterIcon from "./FilterIcon";

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
			<div
				className={
					showFilters
						? "hidden"
						: `py-1.5 px-3 w-36 mt-4 rounded-md border border-ua-blue text-center text-sm
				text-ua-blue hover:bg-ua-blue-dark hover:text-white flex flex-row gap-x-2`
				}
				onClick={() => setShowFilters(true)}
			>
				<FilterIcon />
				{t("nabidky.showFilers")}
			</div>
			<div
				className={
					"flex md:flex-row items-center md:items-start flex-col text-grey-dark"
				}
			>
				<div className={showFilters ? "w-80 md:w-1/4 md:pr-10" : "hidden"}>
					<SearchBox
						placeholder={t("nabidky.search")}
						classNames={{
							input:
								"w-full max-w-lg mx-auto text-sm text-gray-900 placeholder-gray-500 border-gray-300 focus:border-gray-500 rounded-md",
							submit: "absolute right-3 top-3",
							submitIcon: "fill-current text-ua-blue h-4 w-4",
							loadingIcon: "hidden",
							reset: "hidden",
							resetIcon: "hidden",
							loadingIndicator: "hidden",
							form: "flex flex-row text-center relative",
							root: "w-full mb-4 mt-8",
						}}
					/>
					<div className={"flex justify-between"}>
						<div className="font-bold text-left text-lg text-black">
							{t("nabidky.filters")}
						</div>
						<div
							className="mb-3 text-right text-ua-blue cursor-pointer"
							onClick={() => setShowFilters(false)}
						>
							{t("nabidky.hideFilers")}
						</div>
					</div>
					<div className="refinements text-left">
						{/*REGIONS*/}
						{listQuestion
							.filter((it: any) => ["district"].includes(it.type))
							.map((question: any) => {
								return (
									<div className="pt-3 pb-2 border-t" key={question.id}>
										<details open className={cx(styles.closedMarker)}>
											<summary
												className={cx(styles.openedMarker, styles.summary)}
											>
												{t("nabidky.region")}
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
						{/*DISTRICTS*/}
						{listQuestion
							.filter((it: any) => ["district"].includes(it.type))
							.map((question: any) => {
								return (
									<div className="pt-3 pb-2 border-t" key={question.id}>
										<details className={cx(styles.closedMarker)}>
											<summary
												className={cx(styles.openedMarker, styles.summary)}
											>
												{t("nabidky.district")}
											</summary>
											<RefinementList
												key={question.id}
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
						{/*ANOTHER CATEGORIES*/}
						{listQuestion
							.filter((it: any) => ["checkbox", "radio"].includes(it.type))
							.map((question: any) => (
								<div className="pt-3 pb-2 border-t" key={question.id}>
									<details className={cx(styles.closedMarker)}>
										<summary
											className={cx(styles.openedMarker, styles.summary)}
										>
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
				<div className={`${showFilters && "w-3/4"}`}>
					<Hits
						classNames={{
							list: "mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5",
						}}
						hitComponent={(hit: any) => {
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
