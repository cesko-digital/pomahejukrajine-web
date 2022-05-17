import { useTranslation } from "next-i18next";

export const OfferEmpty = () => {
	const { t } = useTranslation();
	return (
		<div className="p-2 max-w-4xl mx-auto rounded-lg bg-yellow-50 shadow-sm sm:p-3 mt-6 text-center text-base">
			<p className="mx-3 text-lg text-gray-900">{t("nabidky.privateOffers")}</p>
		</div>
	);
};
