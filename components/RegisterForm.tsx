/* eslint-disable react/display-name */
import {FormEvent, memo, useCallback, useState} from "react";

interface RegisterFormProps {
	offerTypes: {
		id: number;
		name: string;
		hasCapacity: boolean;
		noteRequired: boolean;
		noteLabel: string;
	}[];
	districts: {
		id: number;
		name: string;
	}[];
}

interface RegisterFormState {
	email: string
	phone: string
	userNote: string
	expertise: string
	districts: string[]
	offers: {
		[id: string]: {
			note: string
			capacity?: number
		}
	}
}

export const RegisterForm = memo<RegisterFormProps>(
	({ offerTypes }) => {
		const [submitting, setSubmitting] = useState<false |'loading' | 'error' | 'success'>(false);
		const [state, setState] = useState<RegisterFormState>({
			email: '',
			phone: '+420',
			userNote: '',
			expertise: '',
			districts: [],
			offers: {},
		})

		const submit = useCallback(async (e: FormEvent) => {
			e.preventDefault()
			setSubmitting('loading')
			const data = {
				email: state.email,
				phone: state.phone,
				userNote: state.userNote,
				expertise: state.expertise,
				districts: state.districts.map(id => ({ connect: { id } })),
				offers: Object.entries(state.offers).map(([id, offer]) => ({
					create: {
						type: { connect: { id } },
						capacity: offer.capacity,
						userNote: offer.note,
					},
				})),
			}
			const response = await fetch(
				process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
					},
					body: JSON.stringify({
						query: `
							mutation ($data: VolunteerCreateInput!) {
								createVolunteer(data: $data) {
									ok
									errorMessage
								}
							}
						`,
						variables: {
							data,
						},
					}),
				},
			)
			const ok = response.ok ? (await response.json())?.data?.createVolunteer?.ok : null

			if (ok) {
				setSubmitting('success')
			} else {
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
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email (povinný)
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="email"
							name="email"
							required
							value={state.email}
							onChange={(e) => setState({ ...state, email: e.target.value })}
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
							name="phone"
							required
							value={state.phone}
							onChange={(e) => setState({ ...state, phone: e.target.value })}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div className="mt-1">
					<label className="block text-sm font-medium text-gray-700">
						Co mohu nabídnout (můžete vybrat více možností):
					</label>
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
												note: '',
												capacity: offerType.hasCapacity ? 1 : undefined,
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
							<div className="mt-2 mb-4">
								{offerType.hasCapacity && (
									<div className="mt-1">
									<label className="block text-sm font-medium text-gray-700">
										Kapacita
									</label>
										<input
											disabled={disabled}
											type="number"
											required
											value={state.offers[offerType.id].capacity}
											className="py-3 px-4 block w-20 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
											onChange={(e) => {
												const offers = { ...state.offers }
												offers[offerType.id].capacity = parseInt(e.target.value)
												setState({ ...state, offers })
											}}
										/>

									</div>
								)}

								<label className="block text-sm font-medium text-gray-700">
									{offerType.noteLabel || (offerType.noteRequired ? 'Poznámka:' : 'Poznámka (nepovinná):')}
								</label>
								<div className="mt-1">
									<textarea
										disabled={disabled}
										required={offerType.noteRequired}
										value={state.offers[offerType.id].note}
										className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
										onChange={(e) => {
											const offers = { ...state.offers }
											offers[offerType.id].note = e.target.value
											setState({ ...state, offers })
										}}
									/>
								</div>
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
					<button
						type="submit"
						disabled={disabled}
						className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Odeslat
					</button>
				</div>
			</form>
		)
	}
)
