import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useMemo } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Meta } from "../components/Meta";
import Search from "../components/Search";
import Filter, { RegionDistrictPair } from "../components/OrganizationFilter";
import OrganizationList from "../components/OrganizationList";
import { Organization } from "../lib/model/Organization";
import { useTranslation } from "next-i18next";

type Props = {
	organizations: Organization[];
};

const Organizations: NextPage<Props> = ({
	organizations: organizationsProps,
}) => {
	const { t } = useTranslation();
	const organizations: Organization[] = useMemo(
		() =>
			organizationsProps
				.filter((organization) => !!organization.name) // filter out organizations without name - those are mistakes
				.map((organization) => ({
					...organization,
					...(organization.organizationType
						? {
								organizationTypeName: t(
									`organizace.${organization.organizationType}`
								),
						  }
						: {}),
				})),
		[organizationsProps, t]
	);

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
							organization.districts.some((it) => it === district)
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
		<div className="antialiased text-black">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white px-4 py-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<main>
					<div className="mt-2 text-center">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl">
							{t("organizace.title")}
						</h2>
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
						placeholder={t("organizace.search")}
					/>

					<Filter
						organizations={organizations}
						onFiltered={setSelectedRegionDistrictPairs}
					/>

					<OrganizationList organizations={organizationsToShow} />
				</main>
			</div>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
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
						districts {
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
				district: null | { name: string }[];
				region: null | { name: string };
			}
		) => ({
			...organization,
			districts: organization.districts?.map((item: any) => item.name) ?? null,
			region: organization.region?.name ?? null,
		})
	);

	return {
		props: {
			organizations,
			...(await serverSideTranslations(context.locale as string, ["common"])),
		},
	};
};

export default Organizations;
