import React from "react";
import { Organization } from "../lib/model/Organization";
import { useTranslation } from "next-i18next";

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
	return (
		<div className="container mx-auto">
			<div className="mt-8 overflow-x-auto rounded-lg shadow-md md:rounded-xl bg-blue-50">
				<table className="w-full my-4 border-collapse table-auto md:my-8">
					<thead>
						<tr>
							{COLUMNS.map((column) => (
								<th
									key={column}
									className="p-2 pt-0 text-left border-b border-gray-200 md:pb-3 md:p-4 first:pl-4 md:first:pl-8"
								>
									{t(`organizace.${column}`)}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white">
						{organizations.map((organization) => (
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
