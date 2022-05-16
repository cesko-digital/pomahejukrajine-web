import { OrganizationType } from "./model/Organization";

export const ORGANIZATION_TYPE_NAME: Record<OrganizationType, string> = {
	collegeInitiative: "Školské zařízení",
	researchAndUniversitySector: "Výzkumný a vysokoškolský sektor",
	governmentOrganization: "Vládní a veřejná organizace",
	privateOrganization: "Soukromý podnik",
	other: "Ostatní",
	osvcPerson: "Osoba - OSVČ",
	municipality: "Obec",
	nonprofit: "Nevládní/nezisková organizace",
	foundation: "Nadace",
	media: "Média",
	church: "Církevní organizace",
	volunteerInitiative: "Dobrovolnická iniciativa",
};
