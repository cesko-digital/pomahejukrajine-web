import {FormEvent, useCallback, useState} from "react";
export const VerifyReactionForm = () => {
	const [submitting, setSubmitting] = useState<false | 'submitting' | 'success' | 'error'>(false);
	const [error, setError] = useState<string | null>(null);

	const submit = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		setSubmitting('submitting')

		const urlSearchParams = new URLSearchParams(window.location.search);

		const response = await fetch("/api/verify-reaction", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				secretCode: urlSearchParams.get("secretCode"),
				id: urlSearchParams.get("id"),
			})
		});

		if (response.ok) {
			setSubmitting('success')
		} else {
			let message = 'Chyba při odesílání formuláře'
			try {
				const json = await response.json()
				if (typeof json.error === 'string') {
					message = json.error
				}
			} catch (e) {}
			setError(message)
			setSubmitting('error')
		}
	}, []);


	if (submitting === 'success') {
		return (
			<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
				<p className="mx-3 font-medium text-white">Email byl ověřen. Váš kontakt jsme poslali člověku, který nabídl pomoc.</p>
			</div>
		)
	}

	const disabled = submitting === 'submitting'

	return (
		<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
			{submitting === 'error' && <p className="p-2 rounded-lg bg-red-500 shadow-lg text-center text-white mx-auto px-8">Nastala chyba</p>}
			{error && <p className="p-2 rounded-lg bg-red-500 shadow-lg text-center text-white mx-auto px-8">{error}</p>}
			<button disabled={disabled} type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Potvrzuji</button>
		</form>
	);
}
