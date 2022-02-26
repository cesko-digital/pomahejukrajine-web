import type { NextPage, GetStaticProps } from 'next'
import { Meta } from './layout';
import Header from './templates/header'
import {RegisterForm} from "../components/RegisterForm";

const Home: NextPage = ({ offerTypes, districts }: any) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomoc Ukrajině" description="Pomoc Ukrajině" />
			<Header />
			<div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-12">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pomozte Ukrajincům</h2>
							<p className="mt-4 text-lg leading-6 text-gray-500">
								Nabídněte svou pomoc
							</p>
						</div>
						<div className="mt-12">
							<RegisterForm offerTypes={offerTypes} districts={districts} />
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}


export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
			},
			body: JSON.stringify({
				query: `{
					offerTypes: listOfferType(orderBy: [{order: asc}]) {
						id
						name
						hasCapacity
						noteRequired
						noteLabel
					}
					districts: listDistrict(orderBy: [{name: asc}]) {
						id
						name
					}
				}`
			}),
		},
	)

	const json = await response.json()
	const { data } = json

	return {
		props: { ...data },
	}
}

export default Home
