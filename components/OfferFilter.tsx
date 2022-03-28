import { OfferType } from "../lib/shared";
import cx from "classnames";
import { useCallback } from "react";

const styles = {
	defaultButton:
		"text-gray-900 font-medium py-2 px-4 border rounded-3xl m-1 text-md bg-white border-gray-200 hover:bg-blue-50",
	activeButton:
		"bg-blue-600 text-white border-blue-800 shadow-sm hover:bg-blue-600",
};

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
					Vše ({totalOfferCount})
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
