import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import Filter from "../components/OfferFilter";
import OfferList from "../components/OfferList";
import OfferSubFilter from "../components/OfferSubFilter";
import { FilterWithCount, QuestionFilter } from "../lib/model/FilterModel";
import { Offer } from "../lib/model/Offer";
import { PublicQueryResult } from "../lib/shared";

const SHOW_LIMIT = 44;

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

const Home: NextPage = () => {
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

				<Filter
					onFilterApply={(type) => {
						setShowLimit(SHOW_LIMIT);
						setTypeFilter(type);
						setQuestionFilter({});
						setShowAllFilters(false);
					}}
					availableTypes={availableTypes}
					typeFilter={typeFilter}
					totalOfferCount={totalOfferCount}
					offerTypes={offerTypes}
				/>

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

				<OfferSubFilter
					shownFilters={shownFilters}
					questionFilter={questionFilter}
					setQuestionFilter={setQuestionFilter}
				/>

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

				<OfferList offerTypes={offerTypes} offersToShow={offersToShow} />

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
