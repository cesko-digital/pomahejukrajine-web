import type {NextPage, GetStaticProps} from 'next'
import {Meta} from '../components/Meta'
import Header from '../components/header'
import Footer from '../components/footer';
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = ({offerTypes, districts}: any) => {
	return (
		<div className="antialiased text-gray-600">
			<Meta title="Pomoc Ukrajině" description="Pomoc Ukrajině" />
			<Header />
			<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
						Pomozme Ukrajincům
					</p>
					<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
						Neziskové organizace v ČR se spojili a toto je centrální místo, kde můžete nabídnout svou pomoc. Na tu vám
						pak mohou zareagovat buď naši kolegové v terénu nebo sami Ukrajinci.
					</p>
					<div className="mt-10 space-x-4 hidden">
						<Link href="/nabidka">
							<a
								className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
							>
								Nabídnout pomoc
							</a>
						</Link>
						<a
							href="#"
							className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
						>
							Vyhledat pomoc
						</a>
					</div>
				</div>
				<p className="mt-24 text-center text-base text-gray-400">Tento projekt provozuje Konsorcium nevládních
					organizací pracujících s migranty v ČR. Členy jsou:</p>
				<div className='mt-8 text-center'>
					<Image src="/clenove.png" width={1134} height={365} alt="Členové Konsorcia" />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Home
