import { useTranslation } from "next-i18next";

export type OffersCountProps = {
	count: number;
};

export const OffersCount = ({ count }: OffersCountProps) => {
	const { t } = useTranslation();

	return (
		<div>
			<span className="text-ua-base text-ua-text-black font-bold">
				{`${count} `}
				{count === 1
					? `${t("offers.count.offer")} `
					: `${t("offers.count.offers")} `}
			</span>
			{t("offers.count.correspondsToYourSearch")}
		</div>
	);
};
