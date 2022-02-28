/* eslint-disable react/display-name */
import {FormEvent, memo, useCallback, useState} from "react";
import {ReactionForm, ReactionPayload} from "../lib/reaction";
import {  Error } from "../lib/shared";



export const CreateReactionForm = memo<{ offerId: string }>(
	({ offerId }) => {
		const [submitting, setSubmitting] = useState<false |'loading' | 'error' | 'success'>(false);
		const [errors, setErrors] = useState<Error[]>([])
		const [state, setState] = useState<ReactionForm>({
			email: '',
			phone: '+420',
		})

		const submit = useCallback(async (e: FormEvent) => {
			e.preventDefault()
			setSubmitting('loading')
			const payload: ReactionPayload = {
				offerId,
				...state,
			}
			const response = await fetch(
				'/api/create-reaction',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						data: payload,
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
		}, [state, offerId])

		if (submitting === 'success') {
			return (
				<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3 text-center text-lg">
					<p className="mx-3 font-medium text-white">Odesláno, děkujeme. Za chvíli Vám přijde potvrzovací email, předání Vašich kontaktů jej potřebujeme ověřit.</p>
				</div>
			)
		}

		const disabled = submitting === 'loading'
		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<div>
					{submitting === 'error' && <p>Omlouváme se, něco se pokazilo. Zkuste to prosím znovu.</p>}
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
					Odesláním souhlasím se <a className="underline underline-offset-2 hover:no-underline" target="_blank" href="/souhlas-a-informace-o-zpracovani-pomahejukrajine-cz.pdf">zpracováním údajů za účelem koordinace a organizace pomoci</a>
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
