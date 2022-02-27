/* eslint-disable react/display-name */
import {FormEvent, memo, useCallback, useState} from "react";
import Select, { components } from "react-select";

const SelectInput = (props: any) => <components.Input {...props} inputClassName="outline-none border-none shadow-none focus:ring-transparent" />

interface QuestionDefinition {
	id: string
	question: string;
	type: QuestionType;
	required: boolean;
	options: {
		id: string;
		value: string;
		label: string;
		requireSpecification: boolean;
	}[]
}

type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'number' | 'date' | 'district'

interface QuestionValue {
	value?: string;
	specification?: string;
	values?: {
		value: string;
		specification?: string;
	}[];
}

type Districts = {
	id: string;
	name: string;
}[];

type Languages = {
	id: string;
	name: string;
}[];

interface RegisterFormProps {
	offerTypes: {
		id: string;
		name: string;
		infoText: string;
		questions: QuestionDefinition[];
	}[];
	districts: Districts;
	languages: Languages;
}

interface RegisterFormState {
	name: string;
	organization: string,
	phone: string
	email: string
	contactHours: string,
	expertise: string
	userNote: string
	languages: string[],
	offers: {
		[id: string]: {
			questions: {
				[id: string]: QuestionValue
			}
		}
	}
}

export const QuestionControl = memo<{
	definition: QuestionDefinition,
	disabled: boolean,
	value: QuestionValue,
	onChange: (value: QuestionValue) => void,
	districts: Districts,
	error?: string | undefined,
}>(({ definition, disabled, value, onChange, districts, error }) => {

	return (
		<div className="mt-4">
			<div className="block text-sm font-medium text-gray-700">
				{definition.question}
				{definition.required && <span className="text-red-500">*</span>}
			</div>
			{error && <div className="flex"><div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">{error}</div></div>}
			<div className="mt-1">
				{(definition.type === "text" || definition.type === "date" || definition.type === "number") && (
					<input
						disabled={disabled}
						type={definition.type === "date" ? "date" : definition.type === "number" ? "number" : "text"}
						{...(definition.type === "number" ? { min: 0 } : {})}
						required={definition.required}
						value={value.value ?? ''}
						onChange={(e) => onChange({ ...value, value: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				)}
				{(definition.type === "textarea") && (
					<textarea
						disabled={disabled}
						required={definition.required}
						value={value.value ?? ''}
						onChange={(e) => onChange({ ...value, value: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
					/>
				)}
				{(definition.type === "radio") && (
					<div>
						<div className="flex flex-col">
							{definition.options.map(option => (
								<div key={option.id}>
									<label className="inline-flex items-center">
										<input
											disabled={disabled}
											type="radio"
											required={definition.required}
											name={definition.id}
											value={option.value}
											checked={value.value === option.value}
											onChange={(e) => onChange({ ...value, value: e.target.value })}
											className="mr-2"
										/>
										<span>{option.label}</span>
									</label>
									{value.value === option.value && definition.options.find(it => it.value === value.value)?.requireSpecification && (
										<input
											disabled={disabled}
											type="text"
											required={true}
											value={value.specification ?? ''}
											onChange={(e) => onChange({ ...value, specification: e.target.value })}
											className="mt-1 mb-4 py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md ml-6"
										/>
									)}
								</div>
							))}
						</div>
					</div>
				)}
				{(definition.type === "checkbox") && (
					<div>
						{definition.options.map(option => {
							const relevantValue = value.values?.find(it => it.value === option.value);
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
													values.push({value: option.value});
												} else {
													values.splice(values.findIndex(it => it.value === option.value), 1);
												}
												onChange({...value, values});
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
											value={relevantValue.specification ?? ''}
											onChange={(e) => {
												const values = value.values ?? [];
												const currentItemIndex = values.findIndex(it => it.value === option.value)
												values[currentItemIndex] = { ...values[currentItemIndex], specification: e.target.value }
												onChange({ ...value, values })
											}}
											className="py-1 px-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md ml-6 mb-1"
										/>
									)}
								</div>
							);
						})}
					</div>
				)}

				{(definition.type === "district") && (
					<div>
						<div className="mt-1">
							<Select
								isMulti
								isClearable={false}
								isDisabled={disabled}
								filterOption={(candidate, input) => candidate.label.toLowerCase().includes(input.toLowerCase())}
								options={districts.map(it => ({ value: it.id, label: it.name }))}
								components={{ Input: SelectInput }}
								value={districts.filter(it => value.values?.find(value => value.value === it.name) !== undefined).map(it => ({ value: it.id, label: it.name }))}
								onChange={values => onChange({...value, values: values.map(it => ({value: it.label}))})}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
})

type Error = { input: 'question'; questionId: string; message: string } | { input: 'email'; message: string } | { input: 'offer'; message: string }

export const RegisterForm = memo<RegisterFormProps>(
	({ offerTypes, districts, languages }) => {
		const [submitting, setSubmitting] = useState<false |'loading' | 'error' | 'success'>(false);
		const [errors, setErrors] = useState<Error[]>([])
		const [state, setState] = useState<RegisterFormState>({
			name: '',
			email: '',
			phone: '+420',
			userNote: '',
			expertise: '',
			offers: {},
			languages: [],
			contactHours: 'kdykoliv',
			organization: '',
		})

		const submit = useCallback(async (e: FormEvent) => {
			e.preventDefault()
			setSubmitting('loading')
			const response = await fetch(
				'/api/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						data: state
					}),
				},
			)
			const ok = response.ok
			let json: any = { ok: false }
			try {
				json = await response.json()
			} catch (e) {}

			if (ok && json.ok === true) {
				setSubmitting('success')
			} else {
				if (json.ok === false && Array.isArray(json.errors)) {
					setErrors(json.errors)
				}
				setSubmitting('error')
			}
		}, [state])

		if (submitting === 'success') {
			return (
				<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
					<p className="mx-3 font-medium text-white">Odesláno, děkujeme. Za chvíli Vám přijde potvrzovací email, pro zobrazení vaší nabídky jej potřebujeme ověřit.</p>
				</div>
			)
		}

		const disabled = submitting === 'loading'
		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<div>
					{submitting === 'error' && <p>Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Jméno (povinné)
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
						Organizace (nepovinné)
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="text"
							value={state.organization}
							onChange={(e) => setState({ ...state, organization: e.target.value })}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
						Telefon (nepovinný)
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
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email (povinný)
					</label>
					{errors.find(it => it.input === 'email') !== undefined && (
						<div className="flex"><div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">{errors.find(it => it.input === 'email')!.message}</div></div>
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
						Můžete mne kontaktovat
					</div>
					<div className="mt-1 flex flex-col">
						<label className="flex items-center">
							<input
								disabled={disabled}
								type="checkbox"
								checked={state.contactHours === "kdykoliv"}
								onChange={(e) => setState({ ...state, contactHours: e.target.checked ? "kdykoliv" : "" })}
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
									onChange={(e) => setState({ ...state, contactHours: e.target.value })}
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
					<div className="mt-1 flex flex-col">
						{languages.map(language => (
							<label key={language.id} className="flex items-center">
								<input
									disabled={disabled}
									type="checkbox"
									checked={state.languages.includes(language.id)}
									onChange={(e) => {
										setState(state => ({
											...state,
											languages: e.target.checked ? [...state.languages, language.id] : state.languages.filter(it => it !== language.id)
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
					{errors.find(it => it.input === 'offer') !== undefined && (
						<div className="flex"><div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">{errors.find(it => it.input === 'offer')!.message}</div></div>
					)}
				{offerTypes.map(offerType => (
					<div key={offerType.id} className="mt-1">
						<div>
							<label>
								<input
									disabled={disabled}
									type="checkbox"
									checked={!!state.offers[offerType.id]}
									onChange={(e) => {
										const offers = { ...state.offers }
										if (e.target.checked) {
											offers[offerType.id] = {
												questions: {}
											}
										} else {
											delete offers[offerType.id]
										}
										setState({ ...state, offers })
									}}
								/>
								<span className="pl-2 text-sm font-medium text-gray-700">{offerType.name}</span>
							</label>
						</div>
						{!!state.offers[offerType.id] && (
							<div className="mt-2 mb-4 ml-2 pl-4 border-l-4 border-indigo-500">
								{offerType.infoText && <p>{offerType.infoText}</p>}

								{offerType.questions.map(question => (
									<QuestionControl
										key={question.id}
										definition={question}
										value={state.offers[offerType.id].questions[question.id] ?? {}}
										onChange={newValue => {
											setErrors(errors => errors.filter(it => it.questionId !== question.id))
											setState(state => ({ ...state, offers: { ...state.offers, [offerType.id]: { ...state.offers[offerType.id], questions: { ...state.offers[offerType.id].questions, [question.id]: newValue } } } }))
										}}
										disabled={disabled}
										districts={districts}
										error={errors.find(it => it.questionId === question.id)?.message}
									/>
								))}
							</div>
						)}
					</div>
				))}
				</div>

				<div>
					<label htmlFor="specific" className="block text-sm font-medium text-gray-700">
						Máte specifickou odbornost? (lékař, psycholog, právník, ...)
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

				<div>
					<label htmlFor="note" className="block text-sm font-medium text-gray-700">
						Poznámka
					</label>
					<div className="mt-1">
						<textarea
							disabled={disabled}
							value={state.userNote}
							name="note"
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
							onChange={(e) => setState({ ...state, userNote: e.target.value })}
						/>
					</div>
				</div>

				{/*<button onClick={submit}>Odeslat</button>*/}
				<div>
					Odesláním souhlasím se <a className="underline underline-offset-2 hover:no-underline" target="_blank" href="/privacypolicy.pdf">zpracováním údajů za účelem koordinace a organizace pomoci</a>
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
					{errors.length > 0 && <p className="text-center">Zkontrolujte, zda jste vše vyplnili správně.</p>}
				</div>
			</form>
		)
	}
)
