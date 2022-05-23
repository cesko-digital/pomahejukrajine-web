import { FilterWithCount, QuestionFilter } from "../lib/model/FilterModel";
import cx from "classnames";
import styles from "./OfferSubFilter.module.css";
import { useTranslation } from "next-i18next";

const OfferSubFilter: React.FC<{
	shownFilters: Array<FilterWithCount>;
	questionFilter: QuestionFilter;
	setQuestionFilter: React.Dispatch<React.SetStateAction<QuestionFilter>>;
}> = ({ shownFilters, questionFilter, setQuestionFilter }) => {
	const { t } = useTranslation();

	return (
		<>
			{shownFilters.map((filter) => {
				const selectedGroups = filter.optionGroups?.filter((group) =>
					group.options.some((option) =>
						(questionFilter[filter.id] ?? []).includes(option)
					)
				);
				const selectedGroupsOptions = selectedGroups?.flatMap(
					(it) => it.options
				);
				const shownOptions =
					selectedGroupsOptions !== undefined
						? filter.options.filter((it) =>
								selectedGroupsOptions.includes(it.id)
						  )
						: filter.options;

				return (
					<div key={filter.id} className="mt-4">
						<h3 className="text-center">{filter.question}</h3>
						{filter.optionGroups && (
							<ul className="mt-1 flex flex-wrap justify-center">
								<li>
									<button
										className={cx(
											styles.defaultButton,
											!(questionFilter[filter.id] ?? []).length &&
												styles.activeButton
										)}
										onClick={() => {
											setQuestionFilter((state) => ({
												...state,
												[filter.id]: [],
											}));
										}}
									>
										{t("nabidky.notMatter")}
									</button>
								</li>

								{filter.optionGroups.map((option) => {
									const selected = selectedGroups!.includes(option);
									return (
										<li key={option.id}>
											<button
												className={cx(
													styles.defaultButton,
													selected && styles.activeButton
												)}
												onClick={() => {
													if (selected) {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: state[filter.id]!.filter(
																(it) => !option.options.includes(it)
															),
														}));
													} else {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: [
																...(state[filter.id] ?? []),
																...option.options,
															],
														}));
													}
												}}
											>
												{option.label} ({option.count})
											</button>
										</li>
									);
								})}
							</ul>
						)}

						{shownOptions.length > 0 && (
							<ul className="mt-1 flex flex-wrap justify-center">
								{!filter.optionGroups && (
									<li>
										<button
											className={cx(
												styles.defaultButton,
												!(questionFilter[filter.id] ?? []).length &&
													styles.activeButton
											)}
											onClick={() => {
												setQuestionFilter((state) => ({
													...state,
													[filter.id]: [],
												}));
											}}
										>
											{t("nabidky.notMatter")}
										</button>
									</li>
								)}
								{shownOptions.map((option) => {
									const selected = (questionFilter[filter.id] ?? []).includes(
										option.id
									);
									return (
										<li key={option.id}>
											<button
												className={cx(
													styles.defaultButton,
													selected && styles.activeButton
												)}
												onClick={() => {
													if (selected) {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: state[filter.id]!.filter(
																(it) => it !== option.id
															),
														}));
													} else {
														setQuestionFilter((state) => ({
															...state,
															[filter.id]: [
																...(state[filter.id] ?? []),
																option.id,
															],
														}));
													}
												}}
											>
												{option.label} ({option.count})
											</button>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				);
			})}
		</>
	);
};

export default OfferSubFilter;
