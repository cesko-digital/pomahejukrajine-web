import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Meta } from '../components/Meta'
import Header from '../components/header'
import Footer from '../components/footer'
import { Fragment } from "react"
import { publicQuery, PublicQueryResult } from '../lib/shared'
import Link from 'next/link'

const Home: NextPage<{ offers: Offers } & PublicQueryResult> = ({ offers, offerTypes }) => {

	return (
		<div className="antialiased text-gray-600">
			<Meta title="Nabídky pomoci - Pomáhej Ukrajině" description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí." />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="text-center mt-2">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Moje nabídky pomoci</h1>
				</div>

				<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
					{offers.map(offer => {
						const offerType = offerTypes.find(it => it.id === offer.type.id)!
						return (
							<div key={offer.id} className="p-4 rounded-md border shadow-md m-4 flex flex-col">
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
									)
								})}

								{offer.allowReaction && (
									<>
										<div className="grow"></div>
										<div className="mt-3">
											<Link href={{ pathname: '/nabidka/[id]', query: { id: offer.id } }}>
												<a className="px-2 py-1 bg-indigo-600 text-white rounded-md text-sm">Upravit</a>
											</Link>
										</div>
									</>
								)}
							</div>
						)
					})}
				</div>
			</div>
			<Footer />
		</div >
	)
}

type OfferResponse = {
	id: string
	type: {
		id: string
	}
	assignee: {
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
}
type OffersResponse = OfferResponse[]

type Offer = {
	id: string
	allowReaction: boolean
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
}

type Offers = Offer[]

export const getServerSideProps: GetServerSideProps = async (context) => {
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
						assignee { id }
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
	const data = json.data as PublicQueryResult & { offers: OffersResponse }

	const offers: Offers = data.offers.map(offer => {
		const offerType = data.offerTypes.find(it => it.id === offer.type.id)!
		return ({
			id: offer.id,
			type: offer.type,
			parameters: offer.parameters,
			allowReaction: !offerType.needsVerification && offer.assignee === null,
		})
	})

	console.log('offers', offers)


	return {
		props: {
			...data,
			offers,
		},
	}
}

export default Home
