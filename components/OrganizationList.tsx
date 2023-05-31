import React, { useState } from "react";
import { Organization } from "../lib/model/Organization";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import arrowUpIcon from "../public/arrowUpIcon.svg";
import arrowDownIcon from "../public/arrowDownIcon.svg";
import { useRouter } from "next/router";

const COLUMNS: Array<keyof Organization> = [
	"name",
	"address",
	"identificationNumber",
	"parentOrganization",
	"organizationTypeName",
];

const OrganizationList = ({
	organizations,
}: {
	organizations: Organization[];
}) => {
	const { t } = useTranslation();
	const { locale } = useRouter();

	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortColumn, setSortColumn] = useState<keyof Organization>("name");

	const onSort = (column: keyof Organization) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	const sort = () =>
		organizations.sort((a, b) => {
			const firstValue = Array.isArray(a[sortColumn])
				? (a[sortColumn]?.[0] as string)?.trim()
				: (a[sortColumn] as string)?.trim();
			const secondValue = Array.isArray(b[sortColumn])
				? (b[sortColumn]?.[0] as string)?.trim()
				: (b[sortColumn] as string)?.trim();
			if (!firstValue) {
				return 1;
			}

			const comparisonResult = firstValue.localeCompare(secondValue, locale, {
				ignorePunctuation: true,
			});
			return sortOrder === "asc" ? comparisonResult : -comparisonResult;
		});

	return (
		<div className="container mx-auto">
			<div className="mt-8 overflow-x-auto rounded-lg shadow-md md:rounded-xl bg-blue-50">
				<table className="w-full my-4 border-collapse table-auto md:my-8">
					<thead>
						<tr>
							{COLUMNS.map((column) => (
								<th
									key={column}
									className="p-2 pt-0 text-left border-b border-gray-200 md:pb-3 md:p-4 first:pl-4 md:first:pl-8 cursor-pointer"
									onClick={() => onSort(column)}
								>
									{t(`organizace.${column}`)}
									{column === sortColumn && (
										<Image
											src={sortOrder === "asc" ? arrowDownIcon : arrowUpIcon}
											height={14}
											alt="arrow"
										/>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white">
						{sort().map((organization) => (
							<tr key={organization.id}>
								{COLUMNS.map((column) => (
									<td
										className="p-2 border-b border-gray-200 md:p-4 first:pl-4 md:first:pl-8"
										key={column}
									>
										{column === "name" && organization.website ? (
											<a
												href={organization.website}
												className="underline underline-offset-2"
												target="_blank"
												rel="noreferrer"
											>
												{organization.name}
											</a>
										) : (
											organization[column] || ""
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrganizationList;
