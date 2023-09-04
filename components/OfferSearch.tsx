import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
	Highlight,
	Hits,
	InstantSearch,
	Pagination,
	RefinementList,
	SearchBox,
	Configure,
	ClearRefinements,
} from "react-instantsearch-hooks-web";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./OfferSearch.module.css";
import cx from "classnames";
import FilterIcon from "./FilterIcon";
import { CZECH, BREAKTPOINTS } from "../utils/constants";
import { CreateReactionForm } from "./CreateReactionForm";
import { Modal } from "./Modal";
import Portal from "./Portal";
import { getUsefulLinksContent } from "./OfferUsefulLinks";
import CloseIconAlt from "./CloseIconAlt";

export type OfferSearchProps = {
	listQuestion: any[];
	offerTypeId: string;
	offerType: Record<string, any>;
};

const getInitShowFilters = (): boolean => {
	return window.innerWidth > BREAKTPOINTS.MD;
};

const getValues = (value: any) => {
	const valueType = typeof value;

	if (valueType !== "string") {
		return value.map((val: string, index: number) => (
			<div key={index}>{handleHighlightLink(val)}</div>
		));
	} else {
		return handleHighlightLink(value);
	}
};

const handleHighlightLink = (content: string) => {
	const reqExp = /(?:https?:\/\/|www\.)[^\s\$.?#].[^\s]*/g;
	const isMatch = reqExp.test(content);

	const lines = content.split("\n");

	return (
		<div>
			{lines.map((line: any, index: any) => {
				if (isMatch) {
					const link = line.match(reqExp);
					if (link) {
						const parts = line.split(link[0]);
						return (
							<p key={index}>
								{parts[0]}
								<a
									href={link[0]}
									rel="noreferrer"
									target="_blank"
									className={"text-ua-blue underline font-bold"}
								>
									{link[0]}
								</a>
								{parts[1]}
							</p>
						);
					}
				}
				return <p key={index}>{line}</p>;
			})}
		</div>
	);
};

export const OfferSearch = ({
	listQuestion,
	offerTypeId,
	offerType,
}: OfferSearchProps) => {
	const [showFilters, setShowFilters] = useState<boolean>(
		true /* server side default */
	);
	const { t } = useTranslation();
	const refinementClassnames = {
		item: "py-1",
		checkbox: "w-4 h-4 mr-2 mt-1 border-2 rounded-sm hover:border-ua-blue",
		label: "flex",
		labelText: "flex-1",
		count: "text-sm text-grey-text mt-0.5 ml-2",
		showMore: "text-sm text-gray-600 mt-2 cursor-pointer hover:text-blue-600",
	};
	const { locale } = useRouter();
	const [openedOffer, setOpenedOffer] = useState<any>(null);
	const closeModal = useCallback(() => setOpenedOffer(null), [setOpenedOffer]);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [showusefulLinks, setShowUsefulLinks] = useState<boolean>(false);
	// browser side default
	useEffect(() => setShowFilters(getInitShowFilters()), []);

	const usefulLinksContent = getUsefulLinksContent(t);
	const selectedCategory = usefulLinksContent[offerType.name];

	const typesenseInstantsearchAdapter = useMemo(
		() =>
			new TypesenseInstantSearchAdapter({
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
					query_by:
						[
							listQuestion
								.filter(
									(question: any) =>
										![
											"07d4ee81-3fa1-41df-a5f3-7a1e4c91777f",
											"8958a3e0-ef6f-4a51-9139-c26b7de8e8ef",
											"3d583f4b-3032-44ba-99dd-24269905957d",
											"e7f41069-9e3a-4313-9bc4-e9415372d416",
										].includes(question.id)
								)
								.map(
									(question: any) =>
										`parameter_${locale === CZECH ? "" : "uk_"}${question.id}`
								),
						].join(",") + ",code,organization",
					num_typos: 0,
					sort_by: `updatedAt:${sortOrder}`,
				},
			}),
		[listQuestion, locale, sortOrder]
	);

	return (
		<>
			<InstantSearch
				indexName={`offers_${offerTypeId}`}
				searchClient={typesenseInstantsearchAdapter.searchClient}
			>
				<Configure
					// @ts-ignore
					hitsPerPage={showFilters ? 12 : 15}
				/>

				<div className="flex justify-between mt-4 mb-5 ">
					<div>
						<button
							className={
								showFilters
									? "hidden"
									: `py-3.5 md:py-1.5 px-3 w-36 rounded-md border border-ua-blue text-center text-sm text-ua-blue hover:bg-ua-blue-dark hover:text-white flex flex-row gap-x-2`
							}
							onClick={() => setShowFilters(true)}
						>
							<FilterIcon />
							{t("nabidky.showFilers")}
						</button>
					</div>
					<button
						className="flex md:hidden py-3.5 md:py-1.5 px-3 bg-yellow-very-light rounded-md text-ua-blue border border-ua-blue"
						onClick={() => setShowUsefulLinks(true)}
					>
						{t("nabidky.usefulLinks")}
					</button>
				</div>

				<div
					className={
						"flex md:flex-row items-center md:items-start flex-col text-grey-dark"
					}
				>
					<div className={showFilters ? "w-80 md:w-1/4 md:pr-10" : "hidden"}>
						<Portal id="offer-search">
							<div className="relative w-full max-w-lg mx-auto">
								<SearchBox
									placeholder={t("nabidky.search")}
									classNames={{
										input:
											"w-full max-w-lg h-[50px] md:h-[44px] mx-auto text-gray-900 placeholder-black border-bg-ua-blue rounded-md",
										submit: cx(styles.searchButton),
										submitIcon: "hidden",
										loadingIcon: "hidden",
										reset: "hidden",
										resetIcon: "hidden",
										loadingIndicator: "hidden",
										form: "flex flex-row text-center",
										root: "w-full mt-2 mb-4 md:my-8",
									}}
								/>
							</div>
						</Portal>
						<div className={"flex justify-between items-baseline"}>
							<div className="font-bold text-left text-lg text-black">
								{t("nabidky.filters")}
							</div>
							<div
								className="mb-3 text-right text-ua-blue cursor-pointer underline hover:no-underline"
								onClick={() => setShowFilters(false)}
							>
								{t("nabidky.hideFilters")}
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
													attribute={`parameter${
														locale === CZECH ? "" : "_uk"
													}_${question.id}_region_facet`}
													limit={20}
													classNames={refinementClassnames}
													sortBy={["name:asc"]}
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
													attribute={`parameter${
														locale === CZECH ? "" : "_uk"
													}_${question.id}_facet`}
													limit={50}
													classNames={refinementClassnames}
													sortBy={["name:asc"]}
												/>
											</details>
										</div>
									);
								})}
						</div>
						<div className="refinements text-left border-b">
							{/*ANOTHER CATEGORIES*/}
							{listQuestion
								.filter((it: any) => ["checkbox", "radio"].includes(it.type))
								.map((question: any) => (
									<div className="pt-3 pb-2 border-t" key={question.id}>
										<details className={cx(styles.closedMarker)}>
											<summary
												className={cx(styles.openedMarker, styles.summary)}
											>
												{locale === CZECH
													? question.question
													: question.questionUK}
											</summary>
											<RefinementList
												key={question.id}
												attribute={`parameter${locale === CZECH ? "" : "_uk"}_${
													question.id
												}_facet`}
												classNames={refinementClassnames}
												sortBy={["name:asc"]}
											/>
										</details>
									</div>
								))}
						</div>
						<ClearRefinements
							translations={{
								resetButtonText: t("nabidky.resetFilters"),
							}}
							classNames={{
								root: "pt-3.5",
								button:
									"px-4 py-[10px] md:py-2.5 bg-white border border-ua-blue text-ua-blue rounded-md text-sm hover:cursor-pointer hover:opacity-80 w-full",
							}}
						/>
					</div>
					<div className={`w-full ${showFilters && "lg:w-3/4"}`}>
						<div className="flex md:justify-end mb-3.5 md:mt-0">
							<button
								className={`mr-2.5 ${
									sortOrder === "desc"
										? ""
										: "underline text-ua-blue hover:no-underline"
								}`}
								disabled={sortOrder === "desc"}
								onClick={() => setSortOrder("desc")}
							>
								{t("nabidky.sortDesc")}
							</button>
							<button
								className={`${
									sortOrder === "asc"
										? ""
										: "underline text-ua-blue hover:no-underline"
								}`}
								disabled={sortOrder === "asc"}
								onClick={() => setSortOrder("asc")}
							>
								{t("nabidky.sortAsc")}
							</button>
						</div>
						<Hits
							classNames={{
								list: `${
									showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"
								} grid md:grid-cols-2 sm:grid-cols-1 gap-[18px] md:gap-5`,
								item: "flex",
							}}
							hitComponent={(hit: any) => {
								return (
									<div
										className="px-3 pt-3.5 md:pt-3 pb-5 bg-grey-light flex flex-col grow"
										key={hit.hit.objectID}
									>
										<h3 className="text-lg font-bold text-grey-text mb-6 md:mb-8">
											{locale === CZECH ? offerType.name : offerType.nameUK}
										</h3>
										{listQuestion.map((question: any) => (
											<div
												key={question.id}
												className="flex flex-col mt-2 text-black"
											>
												{hit.hit[`parameter_${question.id}`] && (
													<>
														<p className="font-bold">
															{locale === CZECH
																? question.question
																: question.questionUK}
														</p>

														{/* TODO: */}
														<p className="md:text-[16px] break-word">
															{/* <Highlight
															attribute={`parameter${
																locale === CZECH ? "" : "_uk"
															}_${question.id}`}
															hit={hit.hit}
														/> */}
															{getValues(hit.hit[`parameter_${question.id}`])}
														</p>
													</>
												)}
											</div>
										))}
										{hit.hit.organization && (
											<div
												key="organization"
												className="flex flex-col mt-2 text-black"
											>
												<p className="font-bold">{t("nabidky.organizace")}</p>
												<p className="md:text-[16px] break-word">
													<Highlight attribute="organization" hit={hit.hit} />
												</p>
											</div>
										)}
										<div className="grow" />
										<div className="mt-7 flex justify-between items-end">
											<a
												className="px-4 py-[10px] md:py-2.5 bg-ua-blue hover:bg-ua-blue-dark text-white rounded-md text-sm transition duration-150"
												href="#"
												onClick={() => setOpenedOffer(hit.hit)}
											>
												<span>{t("nabidky.needThisHelp")}</span>
											</a>
											<div className="mt-2 text-gray-400 flex flex-col items-end text-[13px] pl-2">
												<div>
													{hit.hit.updatedAt
														? new Intl.DateTimeFormat(
																locale === CZECH ? "cs" : "uk",
																{
																	month: "long",
																	year: "numeric",
																}
														  ).format(new Date(hit.hit.updatedAt * 1000))
														: ""}
												</div>
												<Highlight attribute="code" hit={hit.hit} />
											</div>
										</div>
									</div>
								);
							}}
						/>
						<Pagination
							classNames={{
								list: "flex justify-center gap-0 xs:gap-1 mt-14",
								selectedItem: "!bg-ua-blue !text-white",
								item: "scale-90 xs:scale-100 border border-ua-blue text-ua-blue bg-blue-very-light py-1 px-3 rounded-md hover:bg-ua-blue-dark hover:text-white transition duration-150",
								nextPageItem: cx(styles.nextPage),
								previousPageItem: cx(styles.previousPage),
							}}
							showFirst={true}
							showLast={true}
						/>
						{openedOffer && (
							<Modal onClose={closeModal}>
								<CreateReactionForm
									offerId={openedOffer.objectID}
									code={openedOffer.code}
									onClose={closeModal}
								/>
							</Modal>
						)}
					</div>
				</div>
			</InstantSearch>
			{showusefulLinks && (
				<div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-yellow-very-light z-10 overflow-auto">
					<div className="sticky top-0 pt-[14px] mr-4 flex justify-end bg-yellow-very-light">
						<button onClick={() => setShowUsefulLinks(false)}>
							<CloseIconAlt />
						</button>
					</div>
					<div className="flex flex-col my-3 px-8">
						<p className="text-lg font-bold">{t("nabidky.usefulLinks")}</p>
						<div>
							{selectedCategory.leftHalf.map((item, index) => (
								<div
									key={index}
									className=" mt-[18px]"
									dangerouslySetInnerHTML={{
										__html: item,
									}}
								/>
							))}
							{selectedCategory.rightHalf.map((item, index) => (
								<div
									key={index}
									className=" mt-[18px]"
									dangerouslySetInnerHTML={{
										__html: item,
									}}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
