import { FormEvent, useCallback, useState } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"

interface LoginState {
	email: string
	password: string
}

export const LoginForm = () => {
	const [submitting, setSubmitting] = useState<false | 'notSame' | 'submitting' | 'success' | 'error'>(false)
	const [error, setError] = useState<string | null>(null)
	const [state, setState] = useState<LoginState>({
		email: '',
		password: '',
	})
	const router = useRouter()

	const submit = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		setSubmitting('submitting')

		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: state.email,
				password: state.password,
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
	}, [state])


	if (submitting === 'success') {
		router.push('/moje-nabidky')
		return null
	}

	const disabled = submitting === 'submitting'

	return (
		<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
			{error && <p className="p-2 rounded-lg bg-red-500 shadow-lg text-center text-white mx-auto px-8">{error}</p>}
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					E-mail
				</label>
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
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Heslo
				</label>
				<div className="mt-1">
					<input
						disabled={disabled}
						type="password"
						id="password"
						required
						value={state.password}
						onChange={(e) => setState({ ...state, password: e.target.value })}
						className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<div className="mt-1">
					<Link href="/password/reset"><a className="text-sm font-medium text-gray-700">Zapomenuté heslo</a></Link>
				</div>
			</div>
			<button disabled={disabled} type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Přihlásit se</button>
		</form>
	)
}
