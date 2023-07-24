import * as React from "react";
import { useTranslation } from "next-i18next";

export const OfferUsefulLinks = ({ offerType }: Record<string, any>) => {
	const { t } = useTranslation();
	switch (offerType.name) {
		case "Dobrovolnická pomoc":
			console.log(t("common:usefulLinks.volunteerHelp.header"));
			break;
		case "Materiální pomoc":
			break;
		case "Doprava":
			break;
		case "Doučování":
			break;
		case "Kurzy českého jazyka":
			break;
		case "Adaptační skupiny":
			break;
		case "Učebnice a materiály k výuce":
			break;
		case "Tlumočení":
			break;
		case "Zdravotní a sociální péče":
			break;
		case "Psychologická pomoc a terapie":
			break;
		case "Veterinární péče":
			break;
		case "Právní pomoc":
			break;
		case "Volnočasové aktivity":
			break;
		default:
			console.log(false);
	}
	return <div></div>;
};
