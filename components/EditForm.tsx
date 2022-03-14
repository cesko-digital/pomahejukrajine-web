/* eslint-disable react/display-name */
import Link from "next/link"
import { FormEvent, memo, useCallback, useEffect, useState } from "react"
import { Districts, QuestionValue, PublicQueryResult, RegisterFormState, Error } from "../lib/shared"
import { QuestionControl } from "./QuestionControl"
import { default as Select } from "react-select"


interface RegisterFormProps extends PublicQueryResult {
	offerId: string
	offerTypeId: string
	offerStatusType: 'outdated' | 'capacity_exhausted' | 'active'
	questions: {
		[id: string]: QuestionValue
	}
}

export const EditForm = memo<RegisterFormProps>(
	({ districts, languages, offerId, offerTypeId, questions, offerTypes, offerStatusType }) => {
		const offerType = offerTypes.find(o => o.id === offerTypeId)!
		const [submitting, setSubmitting] = useState<false | 'loading' | 'error' | 'success'>(false)
		const [errors, setErrors] = useState<Error[]>([])
		const [state, setState] = useState(questions)
		const [statusState, setStatusState] = useState(offerStatusType)

		const submit = useCallback(async (e: FormEvent) => {
			e.preventDefault()

			if (offerStatusType === 'outdated' || offerStatusType === 'capacity_exhausted') {
				await fetch("/api/updateOfferStatus", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						offerId,
						offerStatus: statusState,
					})
				})
			} else if (statusState === 'outdated' || statusState === 'capacity_exhausted') {
				await fetch("/api/updateOfferStatus", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						offerId,
						offerStatus: statusState,
					})
				})
			}

			const response = await fetch(
				'/api/updateOffer/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						offerId,
						data: state,
					}),
				},
			)
			const ok = response.ok
			let json: any = { ok: false }
			try {
				json = await response.json()
			} catch (e) { }

			if (ok && json.ok === true) {
				setSubmitting('success')
			} else {
				if (json.ok === false && Array.isArray(json.errors)) {
					setErrors(json.errors)
				}
				setSubmitting('error')
			}
		}, [state, offerId, statusState])

		if (submitting === 'success') {
			return (
				<>
					<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
						<p className="mx-3 font-medium text-white">Nabídka byl upravena.</p>
					</div>
					<div className="flex justify-center mt-3">
						<Link href="/moje-nabidky">
							<a className="inline-block bg-blue-50 py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-100">
								Zpět na mé nabídky
							</a>
						</Link>
					</div>
				</>
			)
		}

		const disabled = submitting === 'loading'
		const statusLable: any = {
			outdated: 'Není aktivní',
			capacity_exhausted: 'Vyčerpaná kapacita'
		}

		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<div>
					{submitting === 'error' && <p>Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.</p>}
				</div>
				<div className="mt-1">
					{errors.find(it => it.input === 'offer') !== undefined && (
						<div className="flex"><div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">{errors.find(it => it.input === 'offer')!.message}</div></div>
					)}
					<div className="mt-1">
						<div>
							<span className="block text-sm font-medium text-gray-700">{offerType.name}</span>
						</div>
						<div className="mt-2 mb-4 ml-2 pl-4 border-l-4 border-indigo-500">
							<div>
								<div className="mt-1 mb-4">
									<label>Stav</label>
									<Select
										isClearable={false}
										options={[
											{ value: 'active', label: 'Aktivní' },
											{ value: 'outdated', label: 'Není aktivní' },
											{ value: 'capacity_exhausted', label: 'Vyčerpaná kapacita' },
										]}
										defaultValue={Object.keys(statusLable).includes(offerStatusType) ? { value: offerStatusType, label: statusLable[offerStatusType] } : { value: offerStatusType, label: 'Aktivní' }}
										onChange={option => setStatusState(option?.value ? option.value : 'active')}

									/>
								</div>
							</div>

							{offerType.infoText && <p>{offerType.infoText}</p>}
							{offerType.questions.map(question => (
								<QuestionControl
									key={question.id}
									definition={question}
									value={state[question.id] ?? {}}
									onChange={newValue => {
										setErrors(errors => errors.filter(it => it.input === "question" && it.questionId !== question.id))
										setState(state => ({ ...state, [question.id]: newValue }))
									}}
									disabled={disabled}
									districts={districts}
									error={errors.find(it => it.input === "question" && it.questionId === question.id)?.message}
								/>
							))}
						</div>
					</div>
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
			</form >
		)
	}
)
