/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { memo } from "react";
import { default as Select, components } from "react-select";
import {
	Districts,
	QuestionDefinition,
	QuestionValue,
	Postcode,
} from "../lib/shared";
import { SignedUpload } from "../pages/api/signedUpload";
import { CZECH } from "../utils/constants";

const SelectInput = (props: any) => (
	<components.Input
		{...props}
		inputClassName="outline-none border-none shadow-none focus:ring-transparent"
	/>
);

const removeNonNumericCharacters = (value: string) => {
	return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

const checkIfQuestionIsPostCode = (question: string) => {
	return Postcode.indexOf(question.toLowerCase()) > -1;
};

export const QuestionControl = memo<{
	definition: QuestionDefinition;
	disabled: boolean;
	value: QuestionValue;
	isUK: boolean;
	onChange: (value: QuestionValue) => void;
	districts: Districts;
	error?: string | undefined;
}>(({ definition, disabled, value, isUK, onChange, districts, error }) => {
	const { locale } = useRouter();
	return (
		<div className="mt-4">
			<div className="block text-sm font-medium text-gray-700">
				{locale === CZECH ? definition.question : definition.questionUK}
				{definition.required && <span className="text-red-500">*</span>}
			</div>
			{error && (
				<div className="flex">
					<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
						{error}
					</div>
				</div>
			)}
			<div className="mt-1">
				{definition.type === "text" && (
					<input
						disabled={disabled}
						type={"text"}
						{...(checkIfQuestionIsPostCode(definition.question)
							? { inputmode: "numeric" }
							: {})}
						maxLength={
							checkIfQuestionIsPostCode(definition.question) ? 5 : undefined
						}
						required={definition.required}
						value={locale === CZECH ? value.value ?? "" : value.valueUK ?? ""}
						onChange={(e) => {
							onChange({
								...value,
								[isUK ? "valueUK" : "value"]: checkIfQuestionIsPostCode(
									definition.question
								)
									? removeNonNumericCharacters(e.target.value)
									: e.target.value,
								[isUK ? "value" : "valueUK"]: null,
							});
						}}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				)}
				{(definition.type === "date" || definition.type === "number") && (
					<input
						disabled={disabled}
						type={
							definition.type === "date"
								? "date"
								: definition.type === "number"
								? "number"
								: "text"
						}
						{...(definition.type === "number" ? { min: 0 } : {})}
						{...(checkIfQuestionIsPostCode(definition.question)
							? { inputmode: "numeric" }
							: {})}
						maxLength={
							checkIfQuestionIsPostCode(definition.question) ? 5 : undefined
						}
						required={definition.required}
						value={value.value}
						onChange={(e) => {
							onChange({
								...value,
								value: checkIfQuestionIsPostCode(definition.question)
									? removeNonNumericCharacters(e.target.value)
									: e.target.value,
							});
						}}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				)}
				{definition.type === "textarea" && (
					<textarea
						disabled={disabled}
						required={definition.required}
						value={locale === CZECH ? value.value ?? "" : value.valueUK ?? ""}
						onChange={(e) => {
							onChange({
								...value,
								[isUK ? "valueUK" : "value"]: e.target.value,
								[isUK ? "value" : "valueUK"]: null,
							});
						}}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
					/>
				)}
				{definition.type === "radio" && (
					<div>
						<div className="flex flex-col">
							{definition.options.map((option) => (
								<div key={option.id}>
									<label className="inline-flex items-center">
										<input
											disabled={disabled}
											type="radio"
											required={definition.required}
											name={definition.id}
											value={option.value}
											checked={value.value === option.value}
											onChange={(e) => {
												onChange({
													...value,
													value: e.target.value,
												});
											}}
											className="mr-2"
										/>
										{locale === CZECH ? option.label : option.labelUK}
									</label>
									{value.value === option.value &&
										definition.options.find((it) => it.value === value.value)
											?.requireSpecification && (
											<input
												disabled={disabled}
												type="text"
												required={true}
												value={
													locale === CZECH
														? value.specification
														: value.specificationUK
												}
												onChange={(e) => {
													onChange({
														...value,
														[isUK ? "specificationUK" : "specification"]:
															e.target.value,
														[isUK ? "specification" : "specificationUK"]: null,
													});
												}}
												className="mt-1 mb-4 py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md ml-6"
											/>
										)}
								</div>
							))}
						</div>
					</div>
				)}
				{definition.type === "checkbox" && (
					<div>
						{definition.options.map((option) => {
							const relevantValue = value.values?.find(
								(it) => it.value === option.value
							);
							const checked = relevantValue !== undefined;
							return (
								<div key={option.id}>
									<label className="inline-flex items-center">
										<input
											disabled={disabled}
											type="checkbox"
											name={definition.id}
											// value={option.value}
											checked={checked}
											onChange={(e) => {
												const values = value.values ?? [];
												if (e.target.checked) {
													values.push({ value: option.value });
												} else {
													values.splice(
														values.findIndex((it) => it.value === option.value),
														1
													);
												}
												onChange({ ...value, values });
											}}
											className="mr-2"
										/>
										<span>
											{locale === CZECH ? option.label : option.labelUK}
										</span>
									</label>
									{checked && option.requireSpecification && (
										<input
											disabled={disabled}
											type="text"
											required
											value={
												locale === CZECH
													? relevantValue.specification
													: relevantValue.specificationUK
											}
											onChange={(e) => {
												const values = value.values ?? [];
												const currentItemIndex = values.findIndex(
													(it) => it.value === option.value
												);

												values[currentItemIndex] = {
													...values[currentItemIndex],
													[isUK ? "specificationUK" : "specification"]:
														e.target.value,
													[isUK ? "specification" : "specificationUK"]: null,
												};
												onChange({ ...value, values });
											}}
											className="py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md ml-6 mb-1"
										/>
									)}
								</div>
							);
						})}
					</div>
				)}

				{definition.type === "district" && (
					<div>
						<div className="mt-1">
							<Select
								isMulti
								isClearable={false}
								isDisabled={disabled}
								filterOption={(candidate, input) =>
									candidate.label.toLowerCase().includes(input.toLowerCase())
								}
								options={districts.map((it) => ({
									value: it.id,
									label: locale === CZECH ? it.name : it.nameUK,
								}))}
								components={{ Input: SelectInput }}
								value={districts
									.filter(
										(it) =>
											value.values?.find(
												(value) =>
													value.value === it.nameUK || value.value === it.name
											) !== undefined
									)
									.map((it) => ({
										value: it.id,
										label: locale === CZECH ? it.name : it.nameUK,
									}))}
								onChange={(values) => {
									onChange({
										...value,
										values: values.map((it) => ({ value: it.label })),
									});
								}}
							/>
						</div>
					</div>
				)}

				{definition.type === "image" && (
					<div>
						<div className="mt-1">
							{value.value && (
								<div className="mb-3">
									<img src={value.value} className="max-w-sm" />
								</div>
							)}
							<input
								type="file"
								onChange={async (e) => {
									const files = e.target.files;

									if (files?.length) {
										const response = await fetch("/api/signedUpload/", {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({ contentType: files[0].type }),
										});

										const {
											ok,
											signedUpload,
										}: { ok: boolean; signedUpload: SignedUpload } =
											await response.json();

										if (ok && signedUpload) {
											await fetch(signedUpload.url, {
												method: signedUpload.method,
												headers: Object.fromEntries(
													signedUpload.headers.map(({ key, value }) => [
														key,
														value,
													])
												),
												body: files[0],
											});
										}

										onChange({
											...value,
											value: signedUpload?.publicUrl,
											valueUK: signedUpload?.publicUrl,
										});
									}
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
});
