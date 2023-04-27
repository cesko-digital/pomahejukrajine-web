import { useTranslation } from "next-i18next";
import Image from "next/image";

export const AccommodationReasons = () => {
	const { t } = useTranslation(["common", "ubytovani"]);

	return (
		<section
			id="accommodation-reasons"
			className="bg-white py-8 px-3 overflow-hidden sm:px-6 md:px-8 md:py-8"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-12 md:mb-16">
						{t("ubytovani:accommodationReasons.title")}
					</h2>
					<div className="text-base md:text-sm flex gap-5 flex-col md:flex-row">
						<AccommodationReason
							title={t("ubytovani:accommodationReasons.reason1.title")}
							text={t("ubytovani:accommodationReasons.reason1.text")}
							image="/ubytovani/solidarita.svg"
						/>
						<AccommodationReason
							title={t("ubytovani:accommodationReasons.reason2.title")}
							text={t("ubytovani:accommodationReasons.reason2.text")}
							image="/ubytovani/integrace.svg"
						/>
						<AccommodationReason
							title={t("ubytovani:accommodationReasons.reason3.title")}
							text={t("ubytovani:accommodationReasons.reason3.text")}
							image="/ubytovani/kulturniVymena.svg"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export type AccommodationReasonProps = {
	title: string;
	text: string;
	image: string;
};

export const AccommodationReason = ({
	title,
	text,
	image,
}: AccommodationReasonProps) => {
	return (
		<div id="accommodation-reason" className="w-full md:w-1/3 md:px-9">
			<Image src={image} width={117} height={117} alt={title} />
			<h3 className="pt-5 pb-5 font-bold py-6">{title}</h3>
			<p
				className="leading-6 mb-10 md:mb-6"
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			/>
		</div>
	);
};
