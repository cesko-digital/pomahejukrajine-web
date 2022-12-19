import type { NextPage, GetStaticProps, GetServerSidePropsContext } from "next";
import { Meta } from "../../components/Meta";
import Header from "../../components/header";
import { EditForm } from "../../components/EditForm";
import Footer from "../../components/footer";
import { publicQuery, PublicQueryResult } from "../../lib/shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface HomeProps extends PublicQueryResult {
	token: string;
	offer?: {
		id: string;
		createdAt: string; // ISO 8601 timestamp
		updatedAt: string; // ISO 8601 timestamp
		code: string;
		type: {
			id: string;
		};
		status: any;
		parameters: {
			id: string;
			value?: string;
			valueUK?: string;
			specification?: string;
			specificationUK?: string;
			values: {
				id: string;
				value?: string;
				valueUK?: string;
				specification?: string;
				specificationUK?: string;
			}[];
			question: {
				id: string;
			};
		}[];
		volunteer: unknown;
	};
}

const Home: NextPage<HomeProps> = ({
	offerTypes,
	districts,
	languages,
	offer,
}) => {
	const { t } = useTranslation();
	if (!offer) {
		return <p>{t("nabidka.errorLoading")}</p>;
	}

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="px-4 py-4 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{t("nabidka.editTitle")}
							</h2>
							<p className="mt-4 text-lg text-gray-500 leading-6">
								{t("nabidka.offerHelp")}
							</p>
						</div>
						<div
							className={`mt-12 ${
								process.env.NEXT_TEMPORARY == "TEMPORARY" ? "hidden" : ""
							}`}
						>
							<EditForm
								offerTypes={offerTypes}
								districts={districts}
								languages={languages}
								uk={false}
								offerTypeId={offer.type.id}
								offerId={offer.id}
								offerCreatedAt={offer.createdAt}
								offerUpdatedAt={offer.updatedAt}
								offerCode={offer.code}
								offerStatusType={offer.status?.type}
								questions={Object.fromEntries(
									offer.parameters.map((item) => [
										item.question.id,
										{
											id: item.id,
											value: item.value,
											valueUK: item.valueUK,
											specification: item.specification,
											specificationUK: item.specificationUK,
											values: item.values.map((value) => ({
												value: value.value,
												valueUK: value.valueUK,
												specification: value.specification,
												specificationUK: value.specificationUK,
											})),
										},
									])
								)}
							/>
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${context.req.cookies.token}`,
		},
		body: JSON.stringify({
			query: `query($id: UUID!) {
						${publicQuery}

						offer: getOffer(by: {id: $id}) {
							id
							createdAt
							updatedAt
							code
							type {
								id
							}
							status {
								id
								order
								name
								type
							}
							parameters {
								id
								value
								valueUK
								specification
								specificationUK
								values {
									id
									value
									valueUK
									specification
									specificationUK
								}
								question {
									id
								}
							}
							volunteer {
								name
								email
								phone
								organization
								expertise
								languages {
									language {
										id
										name
									}
								}
							}
						}
					}`,
			variables: { id: context.params?.id },
		}),
	});

	const json = await response.json();
	const { data } = json;

	return {
		props: {
			...data,
			token: context.req.cookies.token || "",
			...(await serverSideTranslations(context.locale as string, ["common"])),
		},
	};
}
