import React from "react";
import { Organization } from "../lib/model/Organization";

const OrganizationList = ({
	organizations,
}: {
	organizations: Organization[];
}) => {
	return (
		<div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{organizations.map((organization) => {
				return (
					<div
						key={organization.id}
						className="flex flex-col p-4 m-4 border shadow-md rounded-md"
					>
						<h3 className="text-lg font-bold">{organization.name}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default OrganizationList;
