import { useTranslation } from 'next-i18next';
import { FormEvent, useCallback, useState, PropsWithChildren } from "react";
import {
	FormError,
	PublicQueryResult,
	RegisterFormState,
	EditVolunteerFormState,
} from "../lib/shared";
import { QuestionControl } from "./QuestionControl";
import { Required } from "./Required";

export type VolunteerFormProps = PropsWithChildren<
	Partial<PublicQueryResult> & {
		disabled: boolean;
		errored: boolean;
		defaultState?: EditVolunteerFormState;
		errors: FormError[];
		onSubmit: (value: RegisterFormState | EditVolunteerFormState) => any;
		// @todo(): Call this method on any field change.
		onFormValueChanged?: <T>(
			value: T,
			field: "offers",
			...additionalParams: any[]
		) => any;
	}
>;

const isNewVolunteer = (
	state: RegisterFormState | EditVolunteerFormState
): state is RegisterFormState => {
	return Boolean((state as any).offers);
};

export const VolunteerForm = ({
	children,
	disabled,
	errored,
	languages,
	districts,
	offerTypes,
	defaultState,
	errors,
	onFormValueChanged,
	onSubmit,
}: VolunteerFormProps) => {
	const [state, setState] = useState<
		RegisterFormState | EditVolunteerFormState
	>(
		defaultState ?? {
			name: "",
			email: defaultState ? undefined : "",
			emailRepeat: defaultState ? undefined : "",
			phone: "+420",
			expertise: "",
			offers: defaultState ? undefined : {},
			languages: [],
			contactHours: "kdykoliv",
			organization: "",
		}
	);
	const { t } = useTranslation();

	const isNew = isNewVolunteer(state);

	const submitForm = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			onSubmit(state);
		},
		[onSubmit, state]
	);

	if (!state) {
		return null;
	}

	return (
		<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submitForm}>
			<p>
				{t("nabidka.text1")}{" "}
				<strong className="text-red-700 font-bold">*</strong>{" "}
				{t("nabidka.text2")}
			</p>
			{errored && (
				<div>
					<p>{t("nabidka.error")}</p>
				</div>
			)}
			<div>
				<label className="block text-sm font-medium text-gray-700">
					{t("nabidka.name")} <Required />
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
					{t("nabidka.organization")}
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
					{t("nabidka.phone")} <Required />
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
			{isNew && (
				<>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							{t("nabidka.email")} <Required />
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
							{t("nabidka.emailRepeat")} <Required />
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
				</>
			)}
			<div>
				<div className="block text-sm font-medium text-gray-700">
					{t("nabidka.contactMe")}
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
						<span>{t("nabidka.anytime")}</span>
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
			{languages && (
				<div>
					<div className="block text-sm font-medium text-gray-700">
						{t("nabidka.languages")}
					</div>
					{errors.find((it) => it.input === "languages") !== undefined && (
						<div className="flex">
							<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
								{errors.find((it) => it.input === "languages")!.message}
							</div>
						</div>
					)}
					<div className="mt-1 flex flex-col">
						{languages.map((language) => (
							<label key={language.id} className="flex items-center">
								<input
									disabled={disabled}
									type="checkbox"
									checked={state.languages?.includes(language.id)}
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
			)}
			{isNew && offerTypes && (
				<div className="mt-1">
					<label className="block text-sm font-medium text-gray-700">
						{t("nabidka.options")}
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
													if (onFormValueChanged) {
														onFormValueChanged(newValue, "offers", question);
													}
													setState((state) => {
														if (isNewVolunteer(state)) {
															return {
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
															};
														}
														return state;
													});
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
			)}

			<div>
				<label
					htmlFor="specific"
					className="block text-sm font-medium text-gray-700"
				>
					{t("nabidka.expertise")}
				</label>
				<div className="mt-1">
					<input
						disabled={disabled}
						type="text"
						name="specific"
						value={state.expertise}
						onChange={(e) => setState({ ...state, expertise: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				</div>
			</div>

			{children}
		</form>
	);
};
