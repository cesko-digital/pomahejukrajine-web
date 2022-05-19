export enum OrganizationTypeEnum {
	collegeInitiative = "collegeInitiative",
	researchAndUniversitySector = "researchAndUniversitySector",
	governmentOrganization = "governmentOrganization",
	privateOrganization = "privateOrganization",
	other = "other",
	osvcPerson = "osvcPerson",
	municipality = "municipality",
	nonprofit = "nonprofit",
	foundation = "foundation",
	media = "media",
	church = "church",
	volunteerInitiative = "volunteerInitiative",
}

// Note: this is an incomplete type and it will be expanded in #61
export type Organization = {
	id: string;
	name: string;
	// address: string;
	// district: TODO;
	// region: TODO;
	// identificationNumber: string;
	// website: string;
	// note: string | null;
	// nickname : string | null;
	// parentOrganization: string | null;
	// managers: TODO;
	// organizationType: OrganizationTypeEnum;
};
