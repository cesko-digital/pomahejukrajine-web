import type { NextPage, GetServerSideProps } from 'next'
import { Meta } from '../../components/Meta'
import Header from '../../components/header'
import Footer from '../../components/footer';
import { CreateReactionForm } from '../../components/CreateReactionForm';

const Reagovat: NextPage<any> = ({ offerId }) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomáhej Ukrajině" description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí." />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pomozte Ukrajincům</h2>
							<p className="mt-4 text-lg leading-6 text-gray-500">
								Poptat pomoc
							</p>
						</div>
						<div className={`mt-12`}>
							<CreateReactionForm offerId={offerId} />
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	)
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			offerId: ctx.query.id,
		},
	}
}

export default Reagovat
