import cx from "classnames";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import styles from "./OrganizationFilter.module.css";
import { Organization } from "../lib/model/Organization";
import uniq from "lodash.uniq";
import { useTranslation } from "next-i18next";

const SEPARATOR = "@@@";
export type RegionDistrictPair = [string, string];

/*
 * Creates object {[region]: [unique district]} from the list of all organizations.
 */
const organizationsToRegionsAndDistricts = (
	organizations: Organization[]
): Record<string, string[]> =>
	organizations.reduce((acc: Record<string, string[]>, value: Organization) => {
		const { region, districts } = value;
		if (!region) return acc;
		if (region in acc) {
			if (region === "Hlavní město Praha") {
				acc[region] = ["Hlavní město Praha", "Praha-východ", "Praha-západ"];
			}
			acc[region] = acc[region].concat(
				districts.filter((d) => !acc[region].includes(d))
			);
		} else {
			acc[region] = districts;
		}
		return acc;
	}, {});

type Props = {
	organizations: Organization[];
	onFiltered: (selectedRegionDistrictPairs: RegionDistrictPair[]) => void;
};

const Filter = ({ organizations, onFiltered }: Props) => {
	const regionsToDistricts = useMemo(
		() => organizationsToRegionsAndDistricts(organizations),
		[organizations]
	);

	const [selectedRegionDistrictPairs, setSelectedRegionDistrictPairs] =
		useState<RegionDistrictPair[]>([]);
	const onRegionClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const region = event.currentTarget.value;
			if (
				selectedRegionDistrictPairs.map(([region]) => region).includes(region)
			) {
				setSelectedRegionDistrictPairs(
					selectedRegionDistrictPairs.filter((it) => it[0] !== region)
				);
			} else {
				setSelectedRegionDistrictPairs([
					...selectedRegionDistrictPairs,
					...regionsToDistricts[region].map(
						(district) => [region, district] as RegionDistrictPair
					),
				]);
			}
		},
		[
			selectedRegionDistrictPairs,
			setSelectedRegionDistrictPairs,
			regionsToDistricts,
		]
	);

	const onDistrictClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const [region, district] = event.currentTarget.value.split(SEPARATOR, 2);
			if (
				selectedRegionDistrictPairs
					.map(([, district]) => district)
					.includes(district)
			) {
				setSelectedRegionDistrictPairs(
					selectedRegionDistrictPairs.filter((it) => it[1] !== district)
				);
			} else {
				setSelectedRegionDistrictPairs([
					...selectedRegionDistrictPairs,
					[region, district],
				]);
			}
		},
		[selectedRegionDistrictPairs, setSelectedRegionDistrictPairs]
	);

	useEffect(
		() => onFiltered(selectedRegionDistrictPairs),
		[selectedRegionDistrictPairs, onFiltered]
	);

	const { t } = useTranslation();

	return (
		<div className="mt-4">
			<h3 className="text-center">{t("organizace.where")}</h3>
			<ul className="flex flex-wrap justify-center mt-1">
				<li>
					<button
						className={cx(
							styles.defaultButton,
							!selectedRegionDistrictPairs.length && styles.activeButton
						)}
						onClick={() => setSelectedRegionDistrictPairs([])}
					>
						{t("organizace.notMatter")}
					</button>
				</li>

				{Object.keys(regionsToDistricts).map((region) => (
					<li key={region}>
						<button
							value={region}
							className={cx(
								styles.defaultButton,
								selectedRegionDistrictPairs
									.map(([region]) => region)
									.includes(region) && styles.activeButton
							)}
							onClick={onRegionClick}
						>
							{region}
						</button>
					</li>
				))}
			</ul>
			{!!selectedRegionDistrictPairs.length && (
				<ul className="flex flex-wrap justify-center">
					{uniq(selectedRegionDistrictPairs.map(([region]) => region)).flatMap(
						(region) =>
							regionsToDistricts[region].map((district) => {
								return (
									<li key={district}>
										<button
											value={`${region}${SEPARATOR}${district}`}
											className={cx(
												styles.districtButton,
												selectedRegionDistrictPairs
													.map(([, district]) => district)
													.includes(district) && styles.activeDistrictButton
											)}
											onClick={onDistrictClick}
										>
											{district}
										</button>
									</li>
								);
							})
					)}
				</ul>
			)}
		</div>
	);
};

export default Filter;
