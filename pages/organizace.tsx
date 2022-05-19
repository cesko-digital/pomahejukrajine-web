import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import OrganizationList from "../components/OrganizationList";
import { Organization } from "../lib/model/Organization";

type Props = {
	organizations?: Organization[];
};

const Organizations: NextPage<Props> = ({ organizations }) => {
	if (!organizations) {
		return null;
	}

	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Organizace - Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="px-4 py-4 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-8">
				<OrganizationList organizations={organizations} />
			</div>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
		},
		body: JSON.stringify({
			query: `query {
					organizations: listOrganization(orderBy: [{name: asc}]) {
						id
						name
					}
				}
				`,
		}),
	});

	const json = await response.json();
	const data = json.data as Props;

	return {
		props: data,
	};
};

export default Organizations;
