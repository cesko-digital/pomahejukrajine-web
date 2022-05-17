import { OfferType } from "../lib/shared";
import cx from "classnames";
import { useCallback } from "react";
import styles from "./OfferFilter.module.css";
import { useTranslation } from "next-i18next";

const Filter: React.FC<{
	availableTypes: { [name: string]: number };
	onFilterApply: (type: string | null) => void;
	typeFilter: string | null;
	totalOfferCount: number;
	offerTypes: OfferType[];
}> = ({
	onFilterApply,
	availableTypes,
	typeFilter,
	totalOfferCount,
	offerTypes,
}) => {
	const { t } = useTranslation();

	const applyFilter = useCallback(
		(event) => {
			onFilterApply(event.target.value || null);
		},
		[onFilterApply]
	);

	return (
		<ul className="mt-8 flex flex-wrap justify-center">
			<li>
				<button
					className={cx(
						styles.defaultButton,
						!typeFilter && styles.activeButton
					)}
					onClick={applyFilter}
				>
					{t("nabidky.all")} ({totalOfferCount})
				</button>
			</li>

			{Object.entries(availableTypes).map(([type, count]) => (
				<li key={type}>
					<button
						onClick={applyFilter}
						value={type}
						className={cx(
							styles.defaultButton,
							typeFilter === type && styles.activeButton
						)}
					>
						{offerTypes.find((it) => it.id === type)?.name || ""} ({count})
					</button>
				</li>
			))}
		</ul>
	);
};

export default Filter;
