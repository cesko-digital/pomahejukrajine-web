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
			return <p>Odesláno. Za chvíli Vám přijde ověřovací email, postupujte podle instrukce tam.</p>
		}

		const disabled = submitting === 'loading'
		return (
			<form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={submit}>
				{submitting === 'error' && <p>Něco se pokazilo. Zkuste to znovu.</p>}
				<label>
					Email:
					<input
						disabled={disabled}
						type="email"
						required
						value={state.email}
						onChange={(e) => setState({ ...state, email: e.target.value })}
					/>
				</label>
				<label>
					Telefon:
					<input
						disabled={disabled}
						type="text"
						required
						value={state.phone}
						onChange={(e) => setState({ ...state, phone: e.target.value })}
					/>
				</label>
				<label>
					Poznámka:
					<textarea
						disabled={disabled}
						value={state.userNote}
						onChange={(e) => setState({ ...state, userNote: e.target.value })}
					/>
				</label>
				<label>
					Specifická odbornost:
					<input
						disabled={disabled}
						type="text"
						value={state.expertise}
						onChange={(e) => setState({ ...state, expertise: e.target.value })}
					/>
				</label>

				{offerTypes.map(offerType => (
					<div key={offerType.id}>
						<h3>
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
								{offerType.name}
							</label>
						</h3>
						{!!state.offers[offerType.id] && (
							<>
								<label>
									{offerType.noteLabel || (offerType.noteRequired ? 'Poznámka:' : 'Poznámka (nepovinná):')}
									<textarea
										disabled={disabled}
										required={offerType.noteRequired}
										value={state.offers[offerType.id].note}
										onChange={(e) => {
											const offers = { ...state.offers }
											offers[offerType.id].note = e.target.value
											setState({ ...state, offers })
										}}
									/>
								</label>
								{offerType.hasCapacity && (
									<label>
										Kapacita:
										<input
											disabled={disabled}
											type="number"
											required
											value={state.offers[offerType.id].capacity}
											onChange={(e) => {
												const offers = { ...state.offers }
												offers[offerType.id].capacity = parseInt(e.target.value)
												setState({ ...state, offers })
											}}
										/>
									</label>
								)}
							</>
						)}
					</div>
				))}

				{/*<button onClick={submit}>Odeslat</button>*/}
				<button type="submit" disabled={disabled}>Odeslat</button>
			</form>
		)
	}
)

