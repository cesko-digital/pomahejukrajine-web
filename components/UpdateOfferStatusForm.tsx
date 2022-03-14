import { FormEvent, useCallback, useState } from "react"

export type UpdateOfferStatusFormProps = {
	offerStatus: string | undefined
	offerId: string
}

export const UpdateOfferStatusForm = ({ offerStatus, offerId }: UpdateOfferStatusFormProps) => {
	const [isOfferStatusChanged, setIsOfferStatusChanged] = useState<boolean>(false)
	const [submitting, setSubmitting] = useState<false | 'notSame' | 'submitting' | 'success' | 'error'>(false)
	const [error, setError] = useState<string | null>(null)
	const [state, setState] = useState({
		offerStatus,
		offerId,
	})

	const submit = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		setSubmitting('submitting')

		const response = await fetch("/api/updateOfferStatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				offerId: state.offerId,
				offerStatus: state.offerStatus,
			})
		})

		if (response.ok) {
			setSubmitting('success')
		} else {
			let message = 'Chyba při odesílání formuláře'
			try {
				const json = await response.json()
				if (typeof json.error === 'string') {
					message = json.error
				}
			} catch (e) { }
			setError(message)
			setSubmitting('error')
		}
		setIsOfferStatusChanged(false)
	}, [state])


	return (
		<div className="mt-3 text-sm">
			Stav nabídky
			<form onSubmit={submit}>
				<div className="flex gap-4 space-x-4">
					<select className="text-sm" onChange={(e) => {
						setState({ ...state, offerStatus: e.target.value,  })
						setIsOfferStatusChanged(true)
					}} >
						<option value="null">Aktivní</option>
						<option value="outdated" selected={offerStatus === 'outdated'}>Není aktuální</option>
						<option value="capacity_exhausted" selected={offerStatus === 'capacity_exhausted'}>Vyčerpané kapacity</option>
					</select>
					<button className={`px-4 py-1 bg-blue-600 text-white rounded-md text-sm ${!isOfferStatusChanged && 'invisible'}`} type="submit">Uložit</button>
				</div>
			</form>
		</div>
	)
}
