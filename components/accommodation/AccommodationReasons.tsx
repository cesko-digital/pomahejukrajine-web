import { AccommodationReason } from "./AccommodationReason";
import { useTranslation } from "next-i18next";

export const AccommodationReasons = () => {
	const { t } = useTranslation(["common", "ubytovani"]);

	return (
		<div className="bg-white py-8 px-3 overflow-hidden sm:px-6 md:px-8 md:py-8">
			<div className="max-w-7xl mx-auto">
				<section className="text-center">
					<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-10">
						{t("ubytovani:reasons.title")}
					</h2>
					<div className="text-base md:text-sm flex gap-5 flex-col md:flex-row">
						<AccommodationReason
							title={t("ubytovani:reason1.title")}
							text={t("ubytovani:reason1.text")}
							image="/ubytovani/solidarita.svg"
						/>
						<AccommodationReason
							title={t("ubytovani:reason2.title")}
							text={t("ubytovani:reason2.text")}
							image="/ubytovani/integrace.svg"
						/>
						<AccommodationReason
							title={t("ubytovani:reason3.title")}
							text={t("ubytovani:reason3.text")}
							image="/ubytovani/kulturniVymena.svg"
						/>
					</div>
				</section>
			</div>
		</div>
	);
};
