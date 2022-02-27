import type { NextPage, GetStaticProps } from 'next'
import { Meta } from '../components/Meta'
import Header from '../components/header'
import Footer from '../components/footer';
import {Fragment, useState} from "react";
import {publicQuery, PublicQueryResult, QuestionType} from '../lib/shared'

const Home: NextPage<{ offers: Offers } & PublicQueryResult> = ({ offers, offerTypes }) => {
	const [typeFilter, setTypeFilter] = useState<string | null>(null)

	const filteredOffers = offers.filter(offer => {
		if (typeFilter === null) {
			return true
		}
		return offer.type.name === typeFilter
	})

	const availableTypes = offers.reduce<{ [name: string]: number }>((acc, offer) => {
		if (offer.type.name in acc) {
			acc[offer.type.name]++
		} else {
			acc[offer.type.name] = 1
		}
		return acc
	}, {})

	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomáhej Ukrajině" description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí." />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="text-center mt-2">
					<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pomozte Ukrajincům</h2>
					<p className="mt-4 text-lg leading-6 text-gray-500">
						Přehled pomoci
					</p>
				</div>

				<div className="mt-8">
					<ul className="flex flex-wrap justify-center">
						<li>
							<button
								className={`${typeFilter === null ? 'bg-gray-200' : 'bg-white'} text-gray-900 font-medium py-1 px-2 border border-gray-300 rounded-3xl m-1 text-sm`}
								onClick={() => setTypeFilter(null)}
							>
								Vše ({offers.length})
							</button>
						</li>
						{Object.entries(availableTypes).map(([type, count]) => (
							<li key={type}>
								<button
									className={`${typeFilter === type ? 'bg-gray-200' : 'bg-white'} text-gray-900 font-medium py-1 px-2 border border-gray-300 rounded-3xl m-1 text-sm`}
									onClick={() => setTypeFilter(type)}
								>
									{type} ({count})
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
					{filteredOffers.map(offer => {
						const offerType = offerTypes.find(it => it.id === offer.type.id)!
						return (
							<div key={offer.id} className="p-2 rounded-md border border-gray-300 m-4">
								<h3 className="text-lg font-bold">{offer.type.name}</h3>
								{offer.parameters.map(parameter => {
									const question = offerType.questions.find(it => it.id === parameter.question.id)!
									return (
										<div key={parameter.id} className="flex flex-col mt-2">
											<p className="font-bold">{parameter.question.question}</p>
											<p className="ml-4">
												{(parameter.question.type === "district" || parameter.question.type === "checkbox") ? (
													<>
														{parameter.values.map((value, i) => {
															const isLast = i === parameter.values.length - 1
															const requiresSpecification = question.type === "checkbox" && (question.options.find(it => it.value === value.value)?.requireSpecification ?? false)
															return (
																<Fragment key={value.id}>
																	<span>
																		{value.value}
																		{requiresSpecification && ` (${value.specification})`}
																	</span>
																	{!isLast && ', '}
																</Fragment>
															)
														})}
													</>
												) : parameter.question.type === "radio" ? (
													<>
														{parameter.value}
														{(question.options.find(it => it.value === parameter.value)?.requireSpecification ?? false) && ` (${parameter.specification})`}
													</>
												) : parameter.question.type === "date" ? (
													<>
														{parameter.value} {/* TODO */}
													</>
												) : (
													<>
														{parameter.value}
													</>
												)}
											</p>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	)
}

type Offers = {
	id: string
	type: {
		id: string
		name: string
	}
	parameters: {
		id: string
		question: {
			id: string
			type: QuestionType
			question: string
		}
		value: string
		specification?: string
		values: {
			id: string
			value: string
			specification: string
		}[]
	}[]
}[]

export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.CONTEMBER_ADMIN_TOKEN}`,
			},
			body: JSON.stringify({
				query: `{
					${publicQuery}

					offers: listOffer(
						filter: {
							exhausted: { eq: false }
							volunteer: {
								verified: { eq: true }
								banned: { eq: false }
							}
						}
						orderBy: { volunteer: { createdAt: desc } }
					) {
						id
						type {
							id
							name
						}
						parameters (
							filter: {
								question: {
									public: { eq: true }
								}
							}
							orderBy: [{ question: { order: asc } }]
						) {
							id
							question {
								id
								type
								question
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
				`
			}),
		},
	)

	const json = await response.json()
	const { data } = json

	return {
		props: { ...data },
		revalidate: 10,
	}
}

export default Home
