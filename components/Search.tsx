import React, { useCallback, useMemo } from "react";
import styles from "./Search.module.css";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 250;

type Props<ElementType> = {
	allElements: ElementType[];
	searchKeys: string[];
	onSearchResults: (elements: ElementType[]) => void;
	placeholder: string;
};

const Search = <ElementType extends Record<string, any>>(
	props: Props<ElementType>
) => {
	const { allElements, searchKeys, onSearchResults, placeholder } = props;
	const fuse = useMemo(() => {
		return new Fuse(allElements, {
			keys: searchKeys,
			shouldSort: true,
			threshold: 0.3,
		});
	}, [allElements, searchKeys]);

	// debounces search of organizations until DEBOUNCE_DELAY after input stops
	const debouncedSearch = useMemo(
		() =>
			debounce(
				(value: string) =>
					onSearchResults(fuse.search(value).map((element) => element.item)),
				DEBOUNCE_DELAY
			),
		[fuse, onSearchResults]
	);

	const onChange = useCallback(
		(element) => {
			const value = element.target.value;
			if (!!value) {
				debouncedSearch(value);
			} else {
				// we have to cancel debouncedSearch because it might still call `onSearchResults` later
				debouncedSearch.cancel();
				onSearchResults(allElements);
			}
		},
		[debouncedSearch, onSearchResults, allElements]
	);
	return (
		<div className="flex flex-wrap justify-center mt-8">
			<input
				type="search"
				className={styles.search}
				onChange={onChange}
				placeholder={placeholder}
				aria-label={placeholder}
			/>
		</div>
	);
};

export default Search;
