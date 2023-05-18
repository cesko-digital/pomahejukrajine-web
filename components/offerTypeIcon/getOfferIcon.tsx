import AdaptacniSkupiny from "./AdaptacniSkupiny";
import AdministrativniPomoc from "./AdministrativniPomoc";
import Dobrovolnictvi from "./Dobrovolnictvi";
import Doprava from "./Doprava";
import Doucovani from "./Doucovani";
import KurzyCj from "./KurzyCj";
import MaterialniPomoc from "./MaterialniPomoc";
import NebytoveProstory from "./NebytoveProstory";
import PravniPomoc from "./PravniPomoc";
import PsychologickaPomoc from "./PsychologickaPomoc";
import Tlumoceni from "./Tlumoceni";
import Ubytovani from "./Ubytovani";
import Ucebnice from "./Ucebnice";
import VelkeNabidky from "./VelkeNabidky";
import VeterinarniPece from "./VeterinarniPece";
import VolnocasoveAktivity from "./VolnocasoveAktivity";
import Vzdelavani from "./Vzdelavani";
import ZdravotniPece from "./ZdravotniPece";

export const getOfferIcon = (offerType: string) => {
	switch (offerType.trim()) {
		case "Ubytování":
			return <Ubytovani />;
		case "Doučování":
			return <Doucovani />;
		case "Dobrovolnická pomoc":
			return <Dobrovolnictvi />;
		case "Adaptační skupiny":
			return <AdaptacniSkupiny />;
		case "Velké nabídky":
			return <VelkeNabidky />;
		case "Administrativní pomoc v institucích":
			return <AdministrativniPomoc />;
		case "Právní pomoc":
			return <PravniPomoc />;
		case "Vzdělávání dětí a žáků ve školách":
			return <Vzdelavani />;
		case "Materiální pomoc":
			return <MaterialniPomoc />;
		case "Volnočasové aktivity":
		case "Kroužky a zájmové aktivity":
			return <VolnocasoveAktivity />;
		case "Tlumočení":
			return <Tlumoceni />;
		case "Kurzy českého jazyka":
			return <KurzyCj />;
		case "Volné nebytové prostory":
			return <NebytoveProstory />;
		case "Doprava":
			return <Doprava />;
		case "Zdravotní a sociální péče":
			return <ZdravotniPece />;
		case "Psychologická pomoc a terapie":
			return <PsychologickaPomoc />;
		case "Veterinární péče a péče o zvířata":
			return <VeterinarniPece />;
		case "Učebnice a materiály k výuce":
			return <Ucebnice />;
		default:
			return null;
	}
};
