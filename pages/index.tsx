import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import {RegisterForm} from "../components/RegisterForm";

const Home: NextPage = ({ offerTypes, districts }: any) => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>
					OPU: Dobrovolníci
				</h1>
				<RegisterForm offerTypes={offerTypes} districts={districts} />
			</main>
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
