/* eslint-disable react/display-name */
import { FormEvent, memo, useCallback, useState } from "react";
import { FormError, PublicQueryResult, RegisterFormState } from "../lib/shared";
import { QuestionControl } from "./QuestionControl";

const Required = () => {
	return <span className="text-red-700 font-bold">*</span>;
};

export const RegisterForm = memo<PublicQueryResult>(
	({ offerTypes = [], districts, languages }) => {
		const [submitting, setSubmitting] = useState<
			false | "loading" | "error" | "success"
		>(false);
		const [errors, setErrors] = useState<FormError[]>([]);
		const [state, setState] = useState<RegisterFormState>({
			name: "",
			email: "",
			emailRepeat: "",
			phone: "+420",
			expertise: "",
			offers: {},
			languages: [],
			contactHours: "kdykoliv",
			organization: "",
		});

		const submit = useCallback(
			async (e: FormEvent) => {
				e.preventDefault();
				setSubmitting("loading");
				const response = await fetch("/api/register", {
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
						Odesláno, děkujeme. Za chvíli Vám přijde potvrzovací email, pro
						zobrazení vaší nabídky jej potřebujeme ověřit.
					</p>
				</div>
			);
		}

		const disabled = submitting === "loading";
		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<p>
					Položky označené <strong className="text-red-700 font-bold">*</strong>{" "}
					jsou povinné.
				</p>
				{submitting === "error" && (
					<div>
						<p>Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.</p>
					</div>
				)}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Jméno <Required />
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
					<label className="block text-sm font-medium text-gray-700">
						Organizace
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="text"
							value={state.organization}
							onChange={(e) =>
								setState({ ...state, organization: e.target.value })
							}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700"
					>
						Telefon <Required />
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="text"
							id="phone"
							required
							value={state.phone}
							onChange={(e) => setState({ ...state, phone: e.target.value })}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
					{errors.find((it) => it.input === "phone") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "phone")!.message}
							</div>
						</div>
					)}
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email <Required />
					</label>
					{errors.find((it) => it.input === "email") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "email")!.message}
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
					<label
						htmlFor="emailRepeat"
						className="block text-sm font-medium text-gray-700"
					>
						Prosím zadejte svůj Email podruhé <Required />
					</label>
					{errors.find((it) => it.input === "emailRepeat") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "emailRepeat")!.message}
							</div>
						</div>
					)}
					<div className="mt-1">
						<input
							disabled={disabled}
							type="email"
							id="emailRepeat"
							required
							value={state.emailRepeat}
							onChange={(e) =>
								setState({ ...state, emailRepeat: e.target.value })
							}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div>
					<div className="block text-sm font-medium text-gray-700">
						Můžete mne kontaktovat
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
							<span>Kdykoliv</span>
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
									placeholder="Kdy?"
									className="mt-1 mb-4 py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
								/>
							</div>
						)}
					</div>
				</div>
				<div>
					<div className="block text-sm font-medium text-gray-700">
						Hovořím těmito jazyky
					</div>
					{errors.find((it) => it.input === "languages") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "languages")!.message}
							</div>
						</div>
					)}
					<div className="mt-1 flex flex-col">
						{languages?.map((language) => (
							<label key={language.id} className="flex items-center">
								<input
									disabled={disabled}
									type="checkbox"
									checked={state.languages.includes(language.id)}
									onChange={(e) => {
										setState((state) => ({
											...state,
											languages: e.target.checked
												? [...state.languages, language.id]
												: state.languages.filter((it) => it !== language.id),
										}));
									}}
									className="mr-2"
								/>
								<span>{language.name}</span>
							</label>
						))}
					</div>
				</div>
				<div className="mt-1">
					<label className="block text-sm font-medium text-gray-700">
						Co mohu nabídnout (můžete vybrat více možností):
					</label>
					{errors.find((it) => it.input === "offer") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "offer")!.message}
							</div>
						</div>
					)}
					{offerTypes.map((offerType) => (
						<div key={offerType.id} className="mt-1">
							<div>
								<label>
									<input
										disabled={disabled}
										type="checkbox"
										checked={!!state.offers[offerType.id]}
										onChange={(e) => {
											const offers = { ...state.offers };
											if (e.target.checked) {
												offers[offerType.id] = {
													questions: {},
												};
											} else {
												delete offers[offerType.id];
											}
											setState({ ...state, offers });
										}}
									/>
									<span className="pl-2 text-sm font-medium text-gray-700">
										{offerType.name}
									</span>
								</label>
							</div>
							{!!state.offers[offerType.id] && (
								<div className="mt-2 mb-4 ml-2 pl-4 border-l-4 border-indigo-500">
									{offerType.infoText && <p>{offerType.infoText}</p>}
									{offerType.questions.map((question) => {
										return (
											<QuestionControl
												key={question.id}
												definition={question}
												value={
													state.offers[offerType.id].questions[question.id] ??
													{}
												}
												onChange={(newValue) => {
													newValue.type = question.type;
													setErrors((errors) =>
														errors.filter(
															(it) =>
																it.input === "question" &&
																it.questionId !== question.id
														)
													);
													setState((state) => ({
														...state,
														offers: {
															...state.offers,
															[offerType.id]: {
																...state.offers[offerType.id],
																questions: {
																	...state.offers[offerType.id].questions,
																	[question.id]: newValue,
																},
															},
														},
													}));
												}}
												disabled={disabled}
												districts={districts ? districts : []}
												error={
													errors.find(
														(it) =>
															it.input === "question" &&
															it.questionId === question.id
													)?.message
												}
											/>
										);
									})}
								</div>
							)}
						</div>
					))}
				</div>

				<div>
					<label
						htmlFor="specific"
						className="block text-sm font-medium text-gray-700"
					>
						Máte specifickou odbornost? (lékař, psycholog, právník, ...)
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="text"
							name="specific"
							value={state.expertise}
							onChange={(e) =>
								setState({ ...state, expertise: e.target.value })
							}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
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
						Odeslat
					</button>
				</div>
				<div>
					{errors.length > 0 && (
						<p className="text-center">
							Zkontrolujte, zda jste vše vyplnili správně.
						</p>
					)}
				</div>
			</form>
		);
	}
);
