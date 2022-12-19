import type { GetServerSideProps, NextPage } from "next";
import Cookies from "cookies";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { Fragment } from "react";
import {
	publicQuery,
	PublicQueryResult,
	Volunteer,
	listVolunteerIds,
} from "../lib/shared";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { RegisterForm } from "../components/RegisterForm";
import { useRouter } from "next/router";
import { CZECH } from "../utils/constants";

const Home: NextPage<{ offers: Offers } & PublicQueryResult> = ({
	offers,
	offerTypes,
	districts,
	languages,
}) => {
	const volunteerData = offers[0]?.volunteer;
	const { t } = useTranslation();
	const { locale } = useRouter();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="px-4 py-4 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-8">
				<div className="mt-2 text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
						{t("mojeNabidky.title")}
					</h1>
				</div>

				<div className="mt-4 text-center">
					<Link
						href={{
							pathname: "/upravit-profil",
						}}
					>
						<a className="underline mr-3">{t("mojeNabidky.editProfile")}</a>
					</Link>
					<Link href="/logout" prefetch={false}>
						<a className="underline">{t("mojeNabidky.logout")}</a>
					</Link>
				</div>

				<div className="max-w-3xl mx-auto mt-8 grid md:grid-cols-2 sm:grid-cols-1">
					{offers.map((offer) => {
						const statusLable: {
							[status: string]: { text: string; background: string };
						} = {
							outdated: {
								text: t("nabidka.outdated"),
								background: "text-orange-500",
							},
							capacity_exhausted: {
								text: t("nabidka.capacityExhausted"),
								background: "text-red-500",
							},
							bad_experience: {
								text: t("nabidka.badExperience"),
								background: "text-red-500",
							},
						};
						const offerType = offerTypes.find((it) => it.id === offer.type.id)!;
						const createdAt = new Date(offer.createdAt);
						const updatedAt = new Date(offer.updatedAt);
						return (
							<div
								key={offer.id}
								className="flex flex-col p-4 m-4 border shadow-md rounded-md"
							>
								<div className="flex flex-row items-center justify-between">
									<h3 className="text-lg font-bold">
										{locale === CZECH ? offerType.name : offerType.nameUK}
									</h3>
									<span className="text-sm font-bold text-gray-400">
										{offer.code}
									</span>
								</div>
								<div className="flex flex-col items-end text-gray-400 mb-4">
									<div>
										{t("mojeNabidky.created")} {createdAt.toLocaleDateString()}
									</div>
									<div>
										{t("mojeNabidky.updated")} {updatedAt.toLocaleDateString()}
									</div>
								</div>
								{offer.parameters.map((parameter) => {
									const question = offerType.questions.find(
										(it) => it.id === parameter.question.id
									)!;
									if (question) {
										return (
											<div key={parameter.id} className="flex flex-col mt-2">
												<p className="text-sm font-bold">
													{locale === CZECH
														? question.question
														: question.questionUK}
												</p>
												<p className="text-sm">
													{question.type === "district" ||
													question.type === "checkbox" ? (
														<>
															{parameter.values.map((value, i) => {
																const isLast =
																	i === parameter.values.length - 1;
																const requiresSpecification =
																	question.type === "checkbox" &&
																	(question.options.find(
																		(it) => it.value === value.value
																	)?.requireSpecification ??
																		false);
																return (
																	<Fragment key={value.id}>
																		<span>
																			{locale === CZECH
																				? value.value
																				: value.valueUK}
																			{requiresSpecification &&
																				` (${
																					locale === CZECH
																						? value.specification
																						: value.specificationUK
																				})`}
																		</span>
																		{!isLast && ", "}
																	</Fragment>
																);
															})}
														</>
													) : question.type === "radio" ? (
														<>
															{" "}
															{locale === CZECH
																? parameter.value
																: parameter.valueUK}
															{(question.options.find(
																(it) => it.value === parameter.value
															)?.requireSpecification ??
																false) &&
																` (${
																	locale === CZECH
																		? parameter.specification
																		: parameter.specificationUK
																})`}
														</>
													) : question.type === "date" ? (
														<>
															{locale === CZECH
																? parameter.value
																: parameter.valueUK}{" "}
															{/* TODO */}
														</>
													) : (
														<>
															{locale === CZECH
																? parameter.value
																: parameter.valueUK}
														</>
													)}
												</p>
											</div>
										);
									}
								})}
								<div className="mt-2">
									<p className="text-sm font-bold">{t("mojeNabidky.stav")}</p>
									<p
										className={`${
											statusLable[offer.status?.type]?.background ??
											"text-green-500"
										} text-sm`}
									>
										{statusLable[offer.status?.type]?.text ??
											t("nabidka.active")}
									</p>
								</div>
								<div className="grow"></div>
								<div className="mt-3">
									<div>
										<Link
											href={{
												pathname: "/nabidka/[id]",
												query: { id: offer.id },
											}}
										>
											<a className="px-2 py-1 text-sm text-white bg-blue-600 rounded-md">
												{t("mojeNabidky.editOffer")}
											</a>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="px-4 py-4 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-8">
					<div className="relative max-w-xl mx-auto">
						<main className="mt-2">
							<div className="text-center">
								<h2 className="font-extrabold tracking-tight text-gray-900 sm:text-2xl">
									{t("mojeNabidky.addNewOffer")}
								</h2>
							</div>
							<div
								className={`${volunteerData ? "mt-4" : "mt-12"} ${
									process.env.NEXT_TEMPORARY == "TEMPORARY" ? "hidden" : ""
								}`}
							>
								<RegisterForm
									offerTypes={offerTypes}
									districts={districts}
									languages={languages}
									uk={locale === CZECH ? false : true}
									volunteerData={volunteerData}
								/>
							</div>
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

type OfferResponse = {
	id: string;
	volunteer: Volunteer;
	createdAt: string;
	updatedAt: string;
	code: string;
	type: {
		id: string;
	};
	assignee: {
		id: string;
	};
	status: OfferStatus;
	parameters: {
		id: string;
		question: {
			id: string;
		};
		value: string;
		valueUK: string;
		specification: string;
		specificationUK: string;
		values: {
			id: string;
			value: string;
			valueUK: string;
			specification: string;
			specificationUK: string;
		}[];
	}[];
};
type OffersResponse = OfferResponse[];

type OfferStatus = {
	id: string;
	order: number;
	name: string;
	offers: Offer[];
	type: "capacity_exhausted" | "bad_experience" | "outdated";
};

type Offer = {
	id: string;
	createdAt: string; // ISO 8601 timestamp
	updatedAt: string; // ISO 8601 timestamp
	code: string;
	allowReaction: boolean;
	volunteer: Volunteer;
	type: {
		id: string;
	};
	status: OfferStatus;
	parameters: {
		id: string;
		question: {
			id: string;
		};
		value: string;
		valueUK: string;
		specification?: string;
		specificationUK: string;
		values: {
			id: string;
			value: string;
			valueUK: string;
			specification: string;
			specificationUK: string;
		}[];
	}[];
};

type Offers = Offer[];

export const getServerSideProps: GetServerSideProps = async (context) => {
	const cookies = new Cookies(context.req, context.res);
	const token = cookies.get("token");

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}

	const volunteerId = await listVolunteerIds(token);

	if (!volunteerId) {
		cookies.set("token", "", { maxAge: -99999999 });
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	const isDeletedUser = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `query($volunteerId: [UUID!]!) {
					volunteer: listVolunteer(
						filter: {
							id: { in: $volunteerId }
						}
					){
						banned
					}
				}
				`,
				variables: {
					volunteerId: volunteerId,
				},
			}),
		}
	);

	const isDeletedUserData = await isDeletedUser.json();
	isDeletedUserData.data.volunteer.forEach((it: { banned: boolean }) => {
		if (it.banned) {
			cookies.set("token", "", { maxAge: -99999999 });
			return {
				redirect: {
					permanent: false,
					destination: "/",
				},
			};
		}
	});

	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: `query($volunteerId: [UUID!]!) {
					${publicQuery}

					offers: listOffer(
						filter: {
							exhausted: { eq: false }
							volunteer: {
								id: { in: $volunteerId }
								verified: { eq: true }
								banned: { eq: false }
							}
						}
						orderBy: { volunteer: { createdAt: desc } }
					) {
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
						volunteer {
							id
							name
							email
							phone
							organization
							contactHours
							expertise
							verified
							banned
							languages {
								id
								language {
									id
									name
								}
							}
						}
						parameters (
							orderBy: [{ question: { order: asc } }]
						) {
							id
							question {
								id
							}
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
						}
					}
				}
				`,
			variables: {
				volunteerId: volunteerId,
			},
		}),
	});

	const json = await response?.json();
	const data = json?.data as PublicQueryResult & { offers: OffersResponse };

	const offers: Offers = data.offers.map((offer) => {
		const offerType = data.offerTypes.find((it) => it.id === offer.type.id)!;
		return {
			id: offer.id,
			type: offer.type,
			parameters: offer.parameters,
			status: offer.status,
			allowReaction: !offerType.needsVerification,
			volunteer: offer.volunteer,
			createdAt: offer.createdAt,
			updatedAt: offer.updatedAt,
			code: offer.code,
		};
	});

	return {
		props: {
			...data,
			offers,
			...(await serverSideTranslations(context.locale as string, ["common"])),
		},
	};
};

export default Home;
