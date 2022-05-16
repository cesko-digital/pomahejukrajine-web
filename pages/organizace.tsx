import type { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import Search from "../components/Search";
import Filter, { RegionDistrictPair } from "../components/OrganizationFilter";
import OrganizationList from "../components/OrganizationList";
import { Organization } from "../lib/model/Organization";
import { ORGANIZATION_TYPE_NAME } from "../lib/constants";

type Props = {
	organizations: Organization[];
};

const Organizations: NextPage<Props> = ({ organizations }) => {
	const [organizationsAfterSearch, setOrganizationsAfterSearch] =
		useState<Organization[]>(organizations);
	const [selectedRegionDistrictPairs, setSelectedRegionDistrictPairs] =
		useState<RegionDistrictPair[]>([]);

	const [organizationsToShow, setOrganizationsToShow] =
		useState<Organization[]>(organizations);

	// filters organizations from `organizationsAfterSearch` that fulfill `selectedRegionDistrictPairs` filter
	useEffect(() => {
		if (!selectedRegionDistrictPairs.length) {
			setOrganizationsToShow(organizationsAfterSearch);
		} else {
			setOrganizationsToShow(
				organizationsAfterSearch.filter((organization) =>
					// `includes` does not work on arrays of arrays
					selectedRegionDistrictPairs.some(
						([region, district]) =>
							organization.region === region &&
							district === organization.district
					)
				)
			);
		}
	}, [
		setOrganizationsToShow,
		organizationsAfterSearch,
		selectedRegionDistrictPairs,
	]);

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
				<div className="mt-2 text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
						Seznam pomáhajících organizací
					</h1>
				</div>

				<Search
					allElements={organizations}
					searchKeys={[
						"name",
						"address",
						"identificationNumber",
						"parentOrganization",
						"organizationTypeName",
					]}
					onSearchResults={setOrganizationsAfterSearch}
				/>

				<Filter
					organizations={organizations}
					onFiltered={setSelectedRegionDistrictPairs}
				/>

				<OrganizationList organizations={organizationsToShow} />
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
						address
						website
						district {
							name
						}
						region {
							name
						}
						identificationNumber
						parentOrganization
						organizationType
					}
				}
				`,
		}),
	});

	const json = await response.json();
	const organizations = json.data.organizations.map(
		(
			organization: Organization & {
				district: null | { name: string };
				region: null | { name: string };
			}
		) => ({
			...organization,
			district: organization.district?.name ?? null,
			region: organization.region?.name ?? null,
			...(organization.organizationType
				? {
						organizationTypeName:
							ORGANIZATION_TYPE_NAME[organization.organizationType],
				  }
				: {}),
		})
	);

	return {
		props: { organizations: organizations },
	};
};

export default Organizations;
