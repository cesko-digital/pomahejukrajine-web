import type { NextPage } from "next";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import { PublicQueryResult, QuestionType } from "../lib/shared";

const SHOW_LIMIT = 44;

interface Filter {
	id: string;
	type: QuestionType;
	question: string;
	optionGroups?: { id: string; label: string; options: string[] }[];
	options: { id: string; label: string }[];
}

interface FilterWithCount {
	id: string;
	type: QuestionType;
	question: string;
	optionGroups?: {
		id: string;
		label: string;
		options: string[];
		count: number;
	}[];
	options: { id: string; label: string; count: number }[];
}

type QuestionFilter = { [questionId: string]: string[] };

type Data = {
	totalOfferCount: number;
	offerTypes: PublicQueryResult["offerTypes"];
	availableTypes: { [name: string]: number };
	filters: FilterWithCount[];
	lessFilters: FilterWithCount[];
	shownFilters: FilterWithCount[];
	offersToShow: Offer[];
	offersToShowTotalCount: number;
};

const Home: NextPage<Data> = (props) => {
	const [data, setData] = useState<Data | null>(null);
	const [typeFilter, setTypeFilter] = useState<string | null>(null);
	const [questionFilter, setQuestionFilter] = useState<QuestionFilter>({});
	const [showAllFilters, setShowAllFilters] = useState(false);
	const [showLimit, setShowLimit] = useState(SHOW_LIMIT);

	useEffect(() => {
		(async () => {
			setData(
				await fetchData(typeFilter, questionFilter, showAllFilters, showLimit)
			);
		})();
	}, [typeFilter, questionFilter, showAllFilters, showLimit]);

	if (!data) {
		return null;
	}

	let {
		totalOfferCount,
		offerTypes,
		availableTypes,
		filters,
		lessFilters,
		shownFilters,
		offersToShow,
		offersToShowTotalCount,
	} = data;

	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Nabídky pomoci - Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="text-center mt-2">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
						Nabídky pomoci
					</h1>
				</div>

				<ul className="mt-8 flex flex-wrap justify-center">
					<li>
						<button
							className={`${
								typeFilter === null
									? "bg-blue-600 text-white border-blue-800 shadow-sm"
									: "bg-white borde-gray-200"
							} text-gray-900 font-medium py-2 px-4 border rounded-3xl m-1 text-md`}
							onClick={() => {
								setShowLimit(SHOW_LIMIT);
								setTypeFilter(null);
								setQuestionFilter({});
								setShowAllFilters(false);
							}}
						>
							Vše ({totalOfferCount})
						</button>
					</li>
					{Object.entries(availableTypes).map(([type, count]) => (
						<li key={type}>
							<button
								className={`${
									typeFilter === type
										? "bg-blue-600 text-white border-blue-800 shadow-sm"
										: "bg-white border-gray-200"
								} text-gray-900 font-medium py-2 px-4 border rounded-3xl m-1 text-md`}
								onClick={() => {
									setShowLimit(SHOW_LIMIT);
									setTypeFilter(type);
									setQuestionFilter({});
									setShowAllFilters(false);
								}}
							>
								{offerTypes.find((it) => it.id === type)!.name} ({count})
							</button>
						</li>
					))}
				</ul>

				{typeFilter && offersToShow.length === 0 && (
					<div className="p-2 max-w-4xl mx-auto rounded-lg bg-yellow-50 shadow-sm sm:p-3 mt-6 text-center text-base">
						<p className="mx-3 text-lg text-gray-900">
							Tyto nabídky jsou přístupné pouze registrovaným organizacím a
							institucím. Jsou ověřovány a jejich využití je koordinováno. Pokud
							chcete nabídky využít, obraťte se na krajské koordinační centrum,
							obec nebo místní pomáhající organizaci. Důvodem ověřování nabídek
							je bezpečnost příchozích.
						</p>
					</div>
				)}

				{shownFilters.map((filter) => {
					const selectedGroups = filter.optionGroups?.filter((group) =>
						group.options.some((option) =>
							(questionFilter[filter.id] ?? []).includes(option)
						)
					);
					const selectedGroupsOptions = selectedGroups?.flatMap(
						(it) => it.options
					);
					const shownOptions =
						selectedGroupsOptions !== undefined
							? filter.options.filter((it) =>
									selectedGroupsOptions.includes(it.id)
							  )
							: filter.options;

					return (
						<div key={filter.id} className="mt-4">
							<h3 className="text-center">{filter.question}</h3>
							{filter.optionGroups && (
								<ul className="mt-1 flex flex-wrap justify-center">
									<li>
										<button
											className={`${
												(questionFilter[filter.id] ?? []).length === 0
													? "bg-blue-600 text-white border-blue-800 shadow-sm"
													: "bg-white border-gray-200"
											} text-gray-900 font-medium py-1 px-2 border rounded-3xl m-1 text-sm`}
											onClick={() => {
												setQuestionFilter((state) => ({
													...state,
													[filter.id]: [],
												}));
											}}
										>
											Nezáleží
										</button>
									</li>
									{filter.optionGroups.map((option) => {
										const selected = selectedGroups!.includes(option);
										return (
											<li key={option.id}>
												<button
													className={`${
														selected
															? "bg-blue-600 text-white border-blue-800 shadow-sm"
															: "bg-white border-gray-200"
													} text-gray-900 font-medium py-1 px-3 border rounded-3xl m-1 text-sm`}
													onClick={() => {
														if (selected) {
															setQuestionFilter((state) => ({
																...state,
																[filter.id]: state[filter.id]!.filter(
																	(it) => !option.options.includes(it)
																),
															}));
														} else {
															setQuestionFilter((state) => ({
																...state,
																[filter.id]: [
																	...(state[filter.id] ?? []),
																	...option.options,
																],
															}));
														}
													}}
												>
													{option.label} ({option.count})
												</button>
											</li>
										);
									})}
								</ul>
							)}

							{shownOptions.length > 0 && (
								<ul className="mt-1 flex flex-wrap justify-center">
									{!filter.optionGroups && (
										<li>
											<button
												className={`${
													(questionFilter[filter.id] ?? []).length === 0
														? "bg-blue-600 text-white border-blue-800 shadow-sm"
														: "bg-white border-gray-200"
												} text-gray-900 font-medium py-1 px-2 border rounded-3xl m-1 text-sm`}
												onClick={() => {
													setQuestionFilter((state) => ({
														...state,
														[filter.id]: [],
													}));
												}}
											>
												Nezáleží
											</button>
										</li>
									)}
									{shownOptions.map((option) => {
										const selected = (questionFilter[filter.id] ?? []).includes(
											option.id
										);
										return (
											<li key={option.id}>
												<button
													className={`${
														selected
															? "bg-blue-600 text-white border-blue-800 shadow-sm"
															: "bg-white border-gray-200"
													} text-gray-900 font-medium py-1 px-3 border rounded-3xl m-1 text-sm`}
													onClick={() => {
														if (selected) {
															setQuestionFilter((state) => ({
																...state,
																[filter.id]: state[filter.id]!.filter(
																	(it) => it !== option.id
																),
															}));
														} else {
															setQuestionFilter((state) => ({
																...state,
																[filter.id]: [
																	...(state[filter.id] ?? []),
																	option.id,
																],
															}));
														}
													}}
												>
													{option.label} ({option.count})
												</button>
											</li>
										);
									})}
								</ul>
							)}
						</div>
					);
				})}

				{filters.length !== lessFilters.length && (
					<div className="flex justify-center mt-4">
						<button
							onClick={() => setShowAllFilters((it) => !it)}
							className="text-lg shadow-sm bg-white text-blue-800 border border-gray-200 rounded-md px-4 py-2"
						>
							{showAllFilters ? "Méně filtrů" : "Více filtrů"}
						</button>
					</div>
				)}

				<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
					{offersToShow.map((offer) => {
						const offerType = offerTypes.find((it) => it.id === offer.type.id)!;
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
										<div key={parameter.id} className="flex flex-col mt-2">
											<p className="text-sm font-bold">{question.question}</p>
											<p className="text-sm">
												{question.type === "district" ||
												question.type === "checkbox" ? (
													<>
														{parameter.values.map((value, i) => {
															const isLast = i === parameter.values.length - 1;
															const requiresSpecification =
																question.type === "checkbox" &&
																(question.options.find(
																	(it) => it.value === value.value
																)?.requireSpecification ??
																	false);
															return (
																<Fragment key={value.id}>
																	<span>
																		{value.value}
																		{requiresSpecification &&
																			` (${value.specification})`}
																	</span>
																	{!isLast && ", "}
																</Fragment>
															);
														})}
													</>
												) : question.type === "radio" ? (
													<>
														{parameter.value}
														{(question.options.find(
															(it) => it.value === parameter.value
														)?.requireSpecification ??
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

				{showLimit < offersToShowTotalCount && (
					<div className="flex justify-center mt-4">
						<button
							onClick={() =>
								setShowLimit((showLimit) => showLimit + SHOW_LIMIT)
							}
							className="text-lg shadow-sm bg-white text-blue-800 border border-gray-200 rounded-md px-4 py-2"
						>
							Zobrazit další nabídky
						</button>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

type Offer = {
	id: string;
	allowReaction: boolean;
	type: {
		id: string;
	};
	parameters: {
		id: string;
		question: {
			id: string;
		};
		value: string;
		specification?: string;
		values: {
			id: string;
			value: string;
			specification: string;
		}[];
	}[];
};

async function fetchData(
	typeFilter: string | null,
	questionFilter: QuestionFilter,
	showAllFilters: boolean,
	showLimit: number
) {
	const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			typeFilter,
			questionFilter,
			showAllFilters,
			showLimit,
		}),
	});

	return await response.json();
}

export default Home;
