/* eslint-disable react/display-name */
import { useTranslation } from "next-i18next";
import { FormEvent, memo, useCallback, useState } from "react";
import Select, { components } from "react-select";
import {
	Districts,
	QuestionDefinition,
	QuestionValue,
	PublicQueryResult,
	HelpFormState,
	ErrorMultilingual,
} from "../lib/shared";

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
									.map((it) => ({ value: it.id, label: it.name }))}
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

export const HelpForm = memo<PublicQueryResult>(({ offerTypes, uk }) => {
	const [submitting, setSubmitting] = useState<
		false | "loading" | "error" | "success"
	>(false);
	const [errors, setErrors] = useState<ErrorMultilingual[]>([]);
	const [state, setState] = useState<HelpFormState>({
		name: "",
		email: "",
		phone: "+380",
		types: [],
		otherType: "",
		contactHours: "kdykoliv",
	});
	const [otherCheckedState, setOtherCheckedState] = useState<boolean>(false);
	const { t } = useTranslation();

	const submit = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			setSubmitting("loading");
			const response = await fetch("/api/demand", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: state,
				}),
			});
			const ok = response.ok;
			let json: any = { ok: false };
			try {
				json = await response.json();
			} catch (e) {}

			if (ok && json.ok === true) {
				setSubmitting("success");
			} else {
				if (json.ok === false && Array.isArray(json.errors)) {
					setErrors(json.errors);
				}
				setSubmitting("error");
			}
		},
		[state]
	);

	if (submitting === "success") {
		return (
			<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
				<p className="mx-3 font-medium text-white">
					{uk
						? "Надіслано, незабаром ми зв’яжемося з вами."
						: "Odesláno, brzy se vám ozveme."}
				</p>
			</div>
		);
	}

	const disabled = submitting === "loading";
	return (
		<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
			<div>
				{submitting === "error" && (
					<p>
						{uk
							? "Вибачте, щось пішло не так. Будь ласка спробуйте ще раз."
							: "Omlouvám se, něco se pokazilo. Zkuste to prosím znovu."}
					</p>
				)}
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					{uk ? "Імя (обовязково)" : "Jméno (povinné)"}
				</label>
				<div className="mt-1">
					<input
						disabled={disabled}
						type="text"
						required
						value={state.name}
						onChange={(e) => setState({ ...state, name: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="phone"
					className="block text-sm font-medium text-gray-700"
				>
					{uk ? "Телефон (необовязково)" : "Telefon (nepovinný)"}
				</label>
				<div className="mt-1">
					<input
						disabled={disabled}
						type="text"
						id="phone"
						value={state.phone}
						onChange={(e) => setState({ ...state, phone: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					{uk ? "Електронна адреса (обовязково)" : "Email (povinný)"}
				</label>
				{errors.find((it) => it.input === "email") && (
					<div className="flex">
						<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
							{t(errors.find((it) => it.input === "email")!.code)}
						</div>
					</div>
				)}
				<div className="mt-1">
					<input
						disabled={disabled}
						type="email"
						id="email"
						required
						value={state.email}
						onChange={(e) => setState({ ...state, email: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<div className="block text-sm font-medium text-gray-700">
					{uk ? "Ви можете звязатися зі мною" : "Můžete mne kontaktovat"}
				</div>
				<div className="mt-1 flex flex-col">
					<label className="flex items-center">
						<input
							disabled={disabled}
							type="checkbox"
							checked={state.contactHours === "kdykoliv"}
							onChange={(e) =>
								setState({
									...state,
									contactHours: e.target.checked ? "kdykoliv" : "",
								})
							}
							className="mr-2"
						/>
						<span>{uk ? "В любий час" : "Kdykoliv"}</span>
					</label>
					{state.contactHours !== "kdykoliv" && (
						<div>
							<input
								disabled={disabled}
								required
								type="text"
								name="contactHours"
								value={state.contactHours}
								onChange={(e) =>
									setState({ ...state, contactHours: e.target.value })
								}
								placeholder={uk ? "Коли?" : "Kdy?"}
								className="mt-1 mb-4 py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
							/>
						</div>
					)}
				</div>
			</div>

			<div className="mt-1">
				<label className="block text-sm font-medium text-gray-700">
					{uk
						? "З чим мені потрібна допомога (ви можете вибрати більше варіантів)"
						: "S čím potřebuji pomoci (můžete vybrat více možností)"}
				</label>
				{errors.find((it) => it.input === "offer") !== undefined && (
					<div className="flex">
						<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
							{t(errors.find((it) => it.input === "offer")!.code)}
						</div>
					</div>
				)}
				{offerTypes
					?.filter((type) => !type.hideInDemand)
					?.map((offerType) => (
						<div key={offerType.id} className="mt-1">
							<div>
								<label>
									<input
										disabled={disabled}
										type="checkbox"
										checked={!!state.types.includes(offerType.id)}
										onChange={(e) => {
											const types = state.types;

											if (e.target.checked) {
												types.push(offerType.id);
											} else {
												const index = types.indexOf(offerType.id);
												if (index > -1) {
													types.splice(index, 1);
												}
											}

											setState({ ...state, types });
										}}
									/>
									<span className="pl-2 text-sm font-medium text-gray-700">
										{uk ? offerType.nameUK : offerType.name}
									</span>
								</label>
							</div>
						</div>
					))}
				<div>
					<label>
						<input
							disabled={disabled}
							checked={otherCheckedState}
							onChange={(e) => setOtherCheckedState(e.target.checked)}
							type="checkbox"
						/>
						<span className="pl-2 text-sm font-medium text-gray-700">
							{uk ? "Iншая потреба" : "Jiná potřeba"}
						</span>
					</label>
					{otherCheckedState && (
						<textarea
							disabled={disabled}
							value={state.otherType}
							onChange={(e) =>
								setState({ ...state, otherType: e.target.value })
							}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
						/>
					)}
				</div>
			</div>

			<div>
				Odesláním souhlasím se{" "}
				<a
					className="underline underline-offset-2 hover:no-underline"
					target="_blank"
					href="/souhlas-a-informace-o-zpracovani-pomahejukrajine-cz.pdf"
				>
					zpracováním údajů za účelem koordinace a organizace pomoci
				</a>
			</div>
			<div>
				<button
					type="submit"
					disabled={disabled}
					className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{uk ? "Надіслати" : "Odeslat"}
				</button>
			</div>
			<div>
				{errors.length > 0 && (
					<p className="text-center">
						{uk
							? "Переконайтеся, що ви все завершили правильно."
							: "Zkontrolujte, zda jste vše vyplnili správněuk."}
					</p>
				)}
			</div>
		</form>
	);
});
