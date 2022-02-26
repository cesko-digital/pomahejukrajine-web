import type { NextPage, GetStaticProps } from 'next'
import { Meta } from './layout';
import Header from './templates/header'
import {RegisterForm} from "../components/RegisterForm";

const Home: NextPage = ({ offerTypes, districts }: any) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomoc Ukrajině" description="Pomoc Ukrajině" />
			<Header />
			<div className="">
				<main className="">
					<h1 className="">
						OPU: Dobrovolníci
					</h1>
					<RegisterForm offerTypes={offerTypes} districts={districts} />
				</main>
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
