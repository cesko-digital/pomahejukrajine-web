import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import Header from "../../components/header";
import { Meta } from "../../components/Meta";
import Footer from "../../components/footer";
import { CZECH } from "../../utils/constants";
import { getOfferIcon } from "../../components/offerTypeIcon/getOfferIcon";

export type PrivateOffersProps = {
	listOfferType: Record<string, any>;
	locale: string;
};

const PrivateOffers = ({ listOfferType, locale }: PrivateOffersProps) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col  min-h-screen antialiased text-black">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="grow max-w-7xl mx-auto bg-white py-4 px-3 md:px-6 overflow-hidden lg:px-8 lg:py-6">
				<div className="relative flex flex-col items-center">
					<h2 className="text-2xl inline-flex font-bold	lg:text-3xl">
						{t("neverejneNabidky.title")}
					</h2>
					<Link href="/nabidky">
						<a className="text-xs flex items-center md:absolute md:right-0 h-10 py-1.5 px-3 rounded-md sm:underline md:no-underline md:border md:border-ua-blue text-ua-blue md:hover:bg-ua-blue-dark md:hover:text-white transition duration-150">
							{t("neverejneNabidky.linkToPublicOffers")}
						</a>
					</Link>
					<p className="mt-4 lg:mt-12 max-w-2xl text-base text-center text-grey-dark">
						{t("neverejneNabidky.description")}
					</p>
					<p className="text-lg font-bold mt-6">{t("neverejneNabidky.text")}</p>
				</div>

				<ul className="grid grid-cols-1 gap-x-5 gap-y-2.5 lg:grid-cols-4 md:grid-cols-2 mt-5 mb-6 md:mb-14">
					{listOfferType
						.filter((f: any) => f.needsVerification)
						.map((offerType: any) => {
							const icon = getOfferIcon(offerType.name);
							return (
								<li
									key={offerType.id}
									className="flex flex-col h-full border border-ua-blue text-ua-blue bg-blue-very-light rounded-lg py-4 pt-3"
								>
									<div className="grow flex">
										<span className="w-[56px] flex justify-center">{icon}</span>
										<span className="text-smaller flex items-center">
											{locale === CZECH ? offerType.name : offerType.nameUK}
										</span>
									</div>
									<div className="mt-8 pl-3">
										<span className="font-bold text-xl">
											{offerType.paginateOffers.pageInfo.totalCount}
										</span>{" "}
										{t("neverejneNabidky.offers")}
									</div>
								</li>
							);
						})}
				</ul>

				<div className="grid gap-x-5 gap-y-2.5 grid-cols-1 md:grid-cols-2 md:mb-12">
					<div className="bg-yellow-very-light rounded-lg px-4 md:px-16 pt-11 md:pt-14 pb-14 md:pb-16 flex flex-col items-center">
						<h3 className="text-lg text-center font-bold">
							{t("neverejneNabidky.box1Title")}
						</h3>
						<p className="text-center mt-6 grow">
							{t("neverejneNabidky.box1Description")}
						</p>
						<Link href="/organizace">
							<a className="text-white text-center bg-ua-blue rounded-md px-6 py-3.5 md:py-2 mt-10 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
								<span className="py-[1px]">
									{t("neverejneNabidky.box1Button")}
								</span>
							</a>
						</Link>
					</div>
					<div className="bg-yellow-very-light rounded-lg px-4 md:px-16 pt-11 md:pt-14 pb-14 md:pb-16 flex flex-col items-center">
						<h3 className="text-lg text-center font-bold">
							{t("neverejneNabidky.box2Title")}
						</h3>
						<p className="text-center mt-6 grow">
							{t("neverejneNabidky.box2Description")}
						</p>
						<a
							href="https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
							className="text-white text-center bg-ua-blue rounded-md px-6 py-3.5 md:py-2 mt-10 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150"
						>
							<span className="py-[1px]">
								{t("neverejneNabidky.box2Button")}
							</span>
						</a>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PrivateOffers;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env
				.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN!}`,
		},
		body: JSON.stringify({
			query: `
				query ($id: UUID!) {
					offerType: getOfferType(by: { id: $id }) {
						name
					}
					listOfferType(orderBy: { order: asc }) {
						id
						name
						nameUK
						hideInDemand
						needsVerification
						paginateOffers {
							pageInfo {
								totalCount
							}
						}
					}
				}
			`,
			variables: { id: context.query.id },
		}),
	});

	const json = await response.json();
	const { data } = json;
	const locale = context.locale as string;

	return {
		props: {
			...data,
			...(await serverSideTranslations(locale, ["common"])),
			locale,
		},
	};
}
