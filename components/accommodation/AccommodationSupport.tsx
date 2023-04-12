import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BlueGradient } from "./Gradient";

export const AccommodationSupport = () => {
	const { t } = useTranslation("accommodation");

	return (
		<section id="howItWorks" className="py-8 relative">
			<BlueGradient />
			<div className="max-w-[1010px] px-3">
				<div className="max-w-7xl mx-auto text-center py-8">
					<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
						{t("ubytovani:accommodationSupport.title")}
					</h2>
					<p>{t("ubytovani:accommodationSupport.text")}</p>
					<p className={"pt-8"}>{t("ubytovani:accommodationSupport.text2")}</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-ful p-4">
				<div className="w-full h-full rounded-md bg-yellow-lightest text-center p-4">
					<Image width={88} height={58} src={`/ubytovani/house.svg`} />

					<p>
						<strong>{t("ubytovani:accommodationSupport.box1Title")}</strong>
					</p>
				</div>
			</div>
		</section>
	);
};
