import type { NextPage, GetStaticProps } from 'next'
import { Meta } from '../components/Meta'
import Header from '../components/header'
import Footer from '../components/footer';
import {Fragment, useCallback, useMemo, useState} from "react";
import {publicQuery, PublicQueryResult, QuestionType} from '../lib/shared'

type QuestionFilter = { [questionId: string]: string[] };
const Home: NextPage<{ offers: Offers } & PublicQueryResult> = ({ offers, offerTypes, districts }) => {
	const filterOffers = useCallback((base: Offers, filter: QuestionFilter) => {
		return base.filter(offer => {
			return Object.entries(filter).every(([questionId, options]) => {
				if (options.length === 0) {
					return true
				}
				const parameter = offer.parameters.find(it => it.question.id === questionId)
				const values = [...(parameter?.values || []).map(it => it.value), ...(parameter?.value ? [parameter.value] : [])]
				return options.some(optionId => values.includes(optionId))
			})
		})
	}, [])

	const [typeFilter, setTypeFilter] = useState<string | null>(null)
	const [questionFilter, setQuestionFilter] = useState<QuestionFilter>({})
	const [showAllFilters, setShowAllFilters] = useState(false)

	const typeFilteredOffers = offers.filter(offer => {
		if (typeFilter === null) {
			return true
		}
		return offer.type.id === typeFilter
	})

	const availableTypes = offers.reduce<{ [name: string]: number }>((acc, offer) => {
		if (offer.type.id in acc) {
			acc[offer.type.id]++
		} else {
			acc[offer.type.id] = 1
		}
		return acc
	}, {})

	const filters = useMemo(() => {
		if (typeFilter === null) {
			return []
		}

		const offerType = offerTypes.find(it => it.id === typeFilter)!

		return offerType.questions
			.filter(it => ['checkbox', 'radio', 'district'].includes(it.type))
			.flatMap(question => {
				if (question.type === "district") {
					return [
						{
							id: question.id,
							type: question.type as QuestionType,
							question: question.question,
							options: districts.map(it =>({
								id: it.id,
								label: it.name,
							}))
						},
					]
				} else {
					return [{
						id: question.id,
						type: question.type as QuestionType,
						question: question.question,
						options: question.options.map(it => ({
							id: it.id,
							label: it.label,
						}))
					}]
				}
			})
			.map(question => {
				const options = question.options
					.map(option => {
						return {
							...option,
							count: filterOffers(typeFilteredOffers, { [question.id]: [option.label] }).length,
						}
					})
					.filter(it => it.count > 0)
				options.sort((a, b) => b.count - a.count)
				return {
					...question,
					options: options
				}
			})
	}, [offerTypes, typeFilter, districts, filterOffers, typeFilteredOffers])

	const filteredOffers = filterOffers(typeFilteredOffers, questionFilter)
	const lessFilters = filters.filter(it => it.type === "district");
	const shownFilters = showAllFilters ? filters : lessFilters

	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomáhej Ukrajině" description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí." />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="text-center mt-2">
					<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Nabídky pomoci</h2>
				</div>
				<div className="p-2 max-w-3xl mx-auto rounded-lg bg-blue-600 shadow-lg sm:p-3 mt-6 text-center text-base">
					<p className="mx-3 font-medium text-white">Zatím jsou nabídky pouze k náhledu. Nejpozději v úterý ráno zprovozníme možnost reagovat na nabídku přímo zde na portále.</p>
				</div>

				<ul className="mt-8 flex flex-wrap justify-center">
					<li>
						<button
							className={`${typeFilter === null ? 'bg-blue-600 text-white border-blue-800 shadow-sm' : 'bg-white borde-gray-200'} text-gray-900 font-medium py-2 px-4 border rounded-3xl m-1 text-md`}
							onClick={() => {
								setTypeFilter(null);
								setQuestionFilter({})
							}}
						>
							Vše ({offers.length})
						</button>
					</li>
					{Object.entries(availableTypes).map(([type, count]) => (
						<li key={type}>
							<button
								className={`${typeFilter === type ? 'bg-blue-600 text-white border-blue-800 shadow-sm' : 'bg-white border-gray-200'} text-gray-900 font-medium py-2 px-4 border rounded-3xl m-1 text-md`}
								onClick={() => {
									setTypeFilter(type)
									setQuestionFilter({})
								}}
							>
								{offerTypes.find(it => it.id === type)!.name} ({count})
							</button>
						</li>
					))}
				</ul>

				{shownFilters.map(filter => {
					return (
						<div key={filter.id} className="mt-4">
							<h3 className="text-center">{filter.question}</h3>
							<ul className="mt-1 flex flex-wrap justify-center">
								<li>
									<button
										className={`${(questionFilter[filter.id] ?? []).length === 0 ? 'bg-blue-600 text-white border-blue-800 shadow-sm' : 'bg-white border-gray-200'} text-gray-900 font-medium py-1 px-2 border rounded-3xl m-1 text-sm`}
										onClick={() => {
											setQuestionFilter(state => ({...state, [filter.id]: []}))
										}}
									>
										Nezáleží
									</button>
								</li>
								{filter.options.map(option => {
									const selected = (questionFilter[filter.id] ?? []).includes(option.label)
									return (
										<li key={option.id}>
											<button
												className={`${selected ? 'bg-blue-600 text-white border-blue-800 shadow-sm' : 'bg-white border-gray-200'} text-gray-900 font-medium py-1 px-3 border rounded-3xl m-1 text-sm`}
												onClick={() => {
													if (selected) {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: state[filter.id]!.filter(it => it !== option.label)
														}))
													} else {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: [...state[filter.id] ?? [], option.label]
														}))
													}
												}}
											>
												{option.label} ({option.count})
											</button>
										</li>
									);
								})}
							</ul>
						</div>
					)
				})}

				{filters.length !== lessFilters.length && <div className="flex justify-center mt-4">
					<button onClick={() => setShowAllFilters(it => !it)} className="text-lg shadow-sm bg-white text-blue-800 border border-gray-200 rounded-md px-4 py-2">
						{showAllFilters ? 'Méně filtrů' : 'Více filtrů'}
					</button>
				</div>}

				<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
					{filteredOffers.map(offer => {
						const offerType = offerTypes.find(it => it.id === offer.type.id)!
						return (
							<div key={offer.id} className="p-4 rounded-md border shadow-md m-4">
								<h3 className="text-lg font-bold">{offerType.name}</h3>
								{offer.parameters.map(parameter => {
									const question = offerType.questions.find(it => it.id === parameter.question.id)!
									return (
										<div key={parameter.id} className="flex flex-col mt-2">
											<p className="text-sm font-bold">{question.question}</p>
											<p className="text-sm">
												{(question.type === "district" || question.type === "checkbox") ? (
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
												) : question.type === "radio" ? (
													<>
														{parameter.value}
														{(question.options.find(it => it.value === parameter.value)?.requireSpecification ?? false) && ` (${parameter.specification})`}
													</>
												) : question.type === "date" ? (
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
	}
	parameters: {
		id: string
		question: {
			id: string
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
