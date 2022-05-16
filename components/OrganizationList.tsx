import React from "react";
import { Organization } from "../lib/model/Organization";

type Header = string;
const COLUMNS: Array<[Header, keyof Organization]> = [
	["Název", "name"],
	["Adresa", "address"],
	["IČ", "identificationNumber"],
	["Mateřská organizace", "parentOrganization"],
	["Typ", "organizationTypeName"],
];

const OrganizationList = ({
	organizations,
}: {
	organizations: Organization[];
}) => {
	return (
		<div className="container mx-auto">
			<div className="mt-8 overflow-x-auto rounded-lg shadow-md md:rounded-xl bg-blue-50">
				<table className="w-full my-4 border-collapse table-auto md:my-8">
					<thead>
						<tr>
							{COLUMNS.map(([header]) => (
								<th
									key={header}
									className="p-2 pt-0 text-left border-b border-gray-200 md:pb-3 md:p-4 first:pl-4 md:first:pl-8"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white">
						{organizations.map((organization) => (
							<tr key={organization.id}>
								{COLUMNS.map(([, key]) => (
									<td
										className="p-2 border-b border-gray-200 md:p-4 first:pl-4 md:first:pl-8"
										key={key}
									>
										{key === "name" && organization.website ? (
											<a
												href={organization.website}
												className="underline underline-offset-2"
												target="_blank"
												rel="noreferrer"
											>
												{organization.name}
											</a>
										) : (
											organization[key] || ""
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
