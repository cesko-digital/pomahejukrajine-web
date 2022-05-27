export function parseIdFromFacetName(facetName: string): string | null {
	const regex = /^parameter_([^_]*)(_region)?_facet$/;
	const match = regex.exec(facetName);
	return match ? match[1] : null;
}
