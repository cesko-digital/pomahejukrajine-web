import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../../components/header";
import { Meta } from "../../components/Meta";
import { OfferEmpty } from "../../components/OfferEmpty";
import { OfferSearch } from "../../components/OfferSearch";
import { OfferTypeList } from "../../components/OfferTypeList";
import { OfferUsefulLinks } from "../../components/OfferUsefulLinks";
import Footer from "../../components/footer";
import Link from "next/link";

const Offers = (props: any) => {
	const { t } = useTranslation();

	return (
		<div className="antialiased text-black">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="max-w-7xl mx-auto bg-white py-4 px-3 overflow-hidden lg:px-8 lg:py-6">
				<div className="relative flex flex-col items-center">
					<h2 className="text-2xl inline-flex font-bold	lg:text-3xl">
						{t("nabidky.title")}
					</h2>
					<Link href="/neverejne-nabidky">
						<a className="md:text-xs flex items-center md:absolute md:right-0 h-10 pt-5 pb-7 md:pt-1.5 md:pb-1.5 px-3 rounded-md underline md:no-underline md:border md:border-ua-blue text-ua-blue md:hover:bg-ua-blue-dark md:hover:text-white transition duration-150">
							{t("nabidky.linkToPrivateOffers")}
						</a>
					</Link>
				</div>
				<div id="offer-search" />
				<OfferTypeList {...props} />
				{!props.listQuestion.length ? (
					<OfferEmpty />
				) : (
					<>
						<OfferSearch
							listQuestion={props.listQuestion}
							offerTypeId={props.offerTypeId}
							offerType={props.offerType}
						/>
					</>
				)}
			</div>
			<OfferUsefulLinks {...props} />
			<Footer />
		</div>
	);
};

export default Offers;

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
						nameUK
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
					listQuestion(filter: { offerType: { id: { eq: $id } }, public: { eq: true } }, orderBy: { order: asc }) {
						id
						label
						type
						question
						questionUK
						options {
							label
							labelUK
							value
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
			offerTypeId: context.query.id,
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
}
