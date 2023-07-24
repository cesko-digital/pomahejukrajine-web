import Link from "next/link";
import { useRouter } from "next/router";
import { Index, InstantSearch } from "react-instantsearch-dom";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { getOfferIcon } from "./offerTypeIcon/getOfferIcon";
import { CZECH } from "../utils/constants";
import { useState } from "react";
import CloseIcon from "./CloseIcon";
import DropdownIcon from "./DropdownIcon";
import { OffersCount } from "./OffersCount";

export type OfferTypeListProps = {
	listOfferType: any;
	offerTypeId: string;
	locale: string;
};

export const OfferTypeList = ({
	listOfferType,
	offerTypeId,
}: OfferTypeListProps) => {
	const { locale } = useRouter();
	const [showModal, setShowModal] = useState(false);

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

	const selectedType = listOfferType.find(
		(f: { id: string }) => f.id === offerTypeId
	);

	const renderListItems = (isMobileView = false) => {
		return listOfferType
			.filter((f: any) => !f.needsVerification)
			.map(({ id, name, nameUK, paginateOffers }: any) => {
				const icon = getOfferIcon(name);
				const totalCount = paginateOffers.pageInfo.totalCount;
				return (
					<Index indexName={`offers_${id}`} key={id}>
						<li
							className={isMobileView ? "mb-2.5" : ""}
							onClick={() => setShowModal(false)}
						>
							<Link href={`/nabidky/${id}`}>
								<a
									className={`border border-ua-blue min-h-[48px] md:min-h-[44px] rounded-lg flex items-center ${
										offerTypeId === id
											? "bg-ua-blue text-white"
											: "bg-blue-very-light text-ua-blue"
									} hover:bg-ua-blue-dark hover:border-ua-blue-dark hover:text-white transition duration-150`}
								>
									<span className="min-w-[56px] pl-3.5">{icon}</span>
									<span>
										{locale === CZECH ? name : nameUK}
										<span
											className={`md:hidden ${
												offerTypeId === id ? "text-[#9BB6D3]" : "text-grey-text"
											}`}
										>
											&nbsp;({totalCount})
										</span>
									</span>
								</a>
							</Link>
						</li>
					</Index>
				);
			});
	};

	return (
		<>
			<ul className="hidden md:mb-12 md:grid grid-cols-1 gap-x-5 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2">
				<InstantSearch
					indexName={`offers_${offerTypeId}`}
					searchClient={typesenseInstantsearchAdapter.searchClient}
				>
					{renderListItems()}
				</InstantSearch>
			</ul>
			<div
				className="md:hidden min-h-[50px] mb-5 flex items-center border border-ua-blue py-2.5 pl-3.5 pr-5 rounded-lg bg-blue-very-light text-ua-blue"
				onClick={() => setShowModal(true)}
			>
				{getOfferIcon(selectedType.name)}
				<span className="ml-4 grow">
					{locale === CZECH ? selectedType.name : selectedType.nameUK}
					<span className="text-grey-text">
						&nbsp;({selectedType.paginateOffers.pageInfo.totalCount})
					</span>
				</span>

				<DropdownIcon />
			</div>
			{showModal && (
				<div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-white z-10 pr-3.5 pl-4 overflow-auto">
					<div
						className="sticky top-0 pt-6 pb-3 bg-white flex justify-end"
						onClick={() => setShowModal(false)}
					>
						<CloseIcon />
					</div>
					<ul className="flex flex-col mt-4">
						<InstantSearch
							indexName={`offers_${offerTypeId}`}
							searchClient={typesenseInstantsearchAdapter.searchClient}
						>
							{renderListItems(true)}
						</InstantSearch>
					</ul>
				</div>
			)}
			<OffersCount count={selectedType.paginateOffers.pageInfo.totalCount} />
		</>
	);
};
