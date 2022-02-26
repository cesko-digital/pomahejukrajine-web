import type { NextPage } from "next";
import {FormEvent, useCallback, useState} from "react";

interface VerifyState {
	password: string;
	passwordSecond: string;
}

const Verify: NextPage = ({  }) => {
	const [submitting, setSubmitting] = useState<false | 'notSame' | 'submitting' | 'success' | 'error'>(false);
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState<VerifyState>({
		password: "",
		passwordSecond: ""
	});

	const submit = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		setSubmitting('submitting')

		if (state.password !== state.passwordSecond) {
			setSubmitting('notSame')
			return
		}

		const urlSearchParams = new URLSearchParams(window.location.search);

		const response = await fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password: state.password,
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
	}, [state]);


	if (submitting === 'success') {
		return <div>
			<h1>Úspěch</h1>
			<p>Vaše heslo bylo nastaveno</p>
		</div>
	}

	const disabled = submitting === 'submitting'

	return (
		<div>
			<h1>Nastav si heslo</h1>

			<form onSubmit={submit}>
				{submitting === 'notSame' && <p>Hesla se neshodují</p>}
				{submitting === 'error' && <p>Nastala chyba</p>}
				{error && <p>{error}</p>}
				<label>
					Heslo:
					<input
						disabled={disabled}
						type="password"
						required
						value={state.password}
						onChange={(e) => setState({ ...state, password: e.target.value })}
					/>
				</label>
				<label>
					Heslo pro kontrolu:
					<input
						disabled={disabled}
						type="password"
						required
						value={state.passwordSecond}
						onChange={(e) => setState({ ...state, passwordSecond: e.target.value })}
					/>
				</label>
				<button disabled={disabled} type="submit">Nastavit</button>
			</form>

		</div>
	);
}

export default Verify;
