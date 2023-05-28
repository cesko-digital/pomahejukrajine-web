export type OrganizationType =
	| "collegeInitiative"
	| "researchAndUniversitySector"
	| "governmentOrganization"
	| "privateOrganization"
	| "other"
	| "osvcPerson"
	| "municipality"
	| "nonprofit"
	| "foundation"
	| "media"
	| "church"
	| "volunteerInitiative";

export type Organization = {
	id: string;
	name: string;
	address: string | null;
	districts: string[];
	region: string | null;
	identificationNumber: string;
	website: string;
	parentOrganization: string | null;
	organizationType: OrganizationType | null;
	organizationTypeName?: string; // human-readable name of the organization type; added in frontend for full-text search
};
