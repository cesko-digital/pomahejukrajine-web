import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Cookies from "cookies";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { Fragment } from "react";
import { publicQuery, PublicQueryResult, Volunteer } from "../lib/shared";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { RegisterForm } from "../components/RegisterForm";

const Home: NextPage<{ offers: Offers } & PublicQueryResult> = ({
	offers,
	offerTypes,
	districts,
	languages,
}) => {
	const volunteerData = offers[0].volunteer;
	const { t } = useTranslation();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="text-center mt-2">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
						{t("mojeNabidky.title")}
					</h1>
				</div>

				<div className="text-center mt-4">
					<Link href="/logout" prefetch={false}>
						<a className="underline">{t("mojeNabidky.logout")}</a>
					</Link>
				</div>

				<div className="mt-8 max-w-3xl mx-auto grid md:grid-cols-2 sm:grid-cols-1">
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
									if (question) {
										return (
											<div key={parameter.id} className="flex flex-col mt-2">
												<p className="text-sm font-bold">{question.question}</p>
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
															{" "}
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
									}
								})}
								<div className="mt-2">
									<p className="text-sm font-bold">Stav</p>
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
											<a className="px-2 py-1 bg-indigo-600 text-white rounded-md text-sm">
												{t("mojeNabidky.editOffer")}
											</a>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
					<div className="relative max-w-xl mx-auto">
						<main className="mt-2">
							<div className="text-center">
								<h2 className="font-extrabold tracking-tight text-gray-900 sm:text-2xl">
									Přidat další novou nabídku
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
		specification?: string;
		values: {
			id: string;
			value: string;
			specification: string;
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
		specification?: string;
		values: {
			id: string;
			value: string;
			specification: string;
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

	const tenantResponse = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_TENANT_URL!,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `query {
				me {
					projects {
						memberships {
							role
							variables {
								name
								values
							}
						}
						project {
							slug
						}
					}
				}
			}
			`,
			}),
		}
	).then(async (response) => {
		if (response.status !== 200) {
			return "error";
		} else {
			return response.json();
		}
	});

	if (tenantResponse === "error") {
		cookies.set("token", "", { maxAge: -99999999 });
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	const tenantData = await tenantResponse;

	const volunteerId = tenantData.data.me.projects
		.find((it: { project: { slug: string } }) => it.project.slug == "ukrajina")
		?.memberships?.find((it: { role: string }) => it.role == "volunteer")
		?.variables.find((it: { name: string }) => it.name == "volunteerId").values;

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
							specification
							values {
								id
								value
								specification
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

	const json = await response.json();
	const data = json.data as PublicQueryResult & { offers: OffersResponse };

	const offers: Offers = data.offers.map((offer) => {
		const offerType = data.offerTypes.find((it) => it.id === offer.type.id)!;
		return {
			id: offer.id,
			type: offer.type,
			parameters: offer.parameters,
			status: offer.status,
			allowReaction: !offerType.needsVerification,
			volunteer: offer.volunteer,
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
