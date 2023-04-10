import { useTranslation } from "next-i18next";

export const AccommodationSupport = () => {
	const { t } = useTranslation("accommodation");

	return (
		<section className="text-center">
			<div className="max-w-7xl mx-auto bg-gradient">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
					{t("ubytovani:howItWorks.title")}
				</h2>
				<p>{t("ubytovani:howItWorks.text")}</p>
			</div>
		</section>
	);
};
