/* eslint-disable react/display-name */
import { memo } from "react";
import { default as Select, components } from "react-select";
import { Districts, QuestionDefinition, QuestionValue } from "../lib/shared";

const SelectInput = (props: any) => (
	<components.Input
		{...props}
		inputClassName="outline-none border-none shadow-none focus:ring-transparent"
	/>
);

export const QuestionControl = memo<{
	definition: QuestionDefinition;
	disabled: boolean;
	value: QuestionValue;
	onChange: (value: QuestionValue) => void;
	districts: Districts;
	error?: string | undefined;
}>(({ definition, disabled, value, onChange, districts, error }) => {
	return (
		<div className="mt-4">
			<div className="block text-sm font-medium text-gray-700">
				{definition.question}
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
				{(definition.type === "text" ||
					definition.type === "date" ||
					definition.type === "number") && (
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
						required={definition.required}
						value={value.value ?? ""}
						onChange={(e) => onChange({ ...value, value: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				)}
				{definition.type === "textarea" && (
					<textarea
						disabled={disabled}
						required={definition.required}
						value={value.value ?? ""}
						onChange={(e) => onChange({ ...value, value: e.target.value })}
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
											onChange={(e) =>
												onChange({ ...value, value: e.target.value })
											}
											className="mr-2"
										/>
										<span>{option.label}</span>
									</label>
									{value.value === option.value &&
										definition.options.find((it) => it.value === value.value)
											?.requireSpecification && (
											<input
												disabled={disabled}
												type="text"
												required={true}
												value={value.specification ?? ""}
												onChange={(e) =>
													onChange({ ...value, specification: e.target.value })
												}
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
										<span>{option.label}</span>
									</label>
									{checked && option.requireSpecification && (
										<input
											disabled={disabled}
											type="text"
											required
											value={relevantValue.specification ?? ""}
											onChange={(e) => {
												const values = value.values ?? [];
												const currentItemIndex = values.findIndex(
													(it) => it.value === option.value
												);
												values[currentItemIndex] = {
													...values[currentItemIndex],
													specification: e.target.value,
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
									label: it.name,
								}))}
								components={{ Input: SelectInput }}
								value={districts
									.filter(
										(it) =>
											value.values?.find((value) => value.value === it.name) !==
											undefined
									)
									.map((it) => ({
										value: it.id,
										label: it.name,
									}))}
								onChange={(values) =>
									onChange({
										...value,
										values: values.map((it) => ({ value: it.label })),
									})
								}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
});
