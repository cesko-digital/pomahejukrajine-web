/* eslint-disable react/display-name */
import { FormEvent, memo, useCallback, useState } from "react";
import { ReactionForm, ReactionPayload } from "../lib/reaction";
import { FormError } from "../lib/shared";
import { useTranslation } from "next-i18next";

export const CreateReactionForm = memo<{
	offerId: string;
	code: string;
	onClose: () => void;
}>(({ offerId, code, onClose }) => {
	const { t } = useTranslation();
	const [submitting, setSubmitting] = useState<
		false | "loading" | "error" | "success"
	>(false);
	const [errors, setErrors] = useState<FormError[]>([]);
	const [state, setState] = useState<ReactionForm>({
		email: "",
		phone: "+420",
	});

	const submit = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			setSubmitting("loading");
			const payload: ReactionPayload = {
				offerId,
				...state,
			};
			const response = await fetch("/api/create-reaction", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: payload,
				}),
			});
			const ok = response.ok;
			let json: any = { ok: false };
			try {
				json = await response.json();
			} catch (e) {}

			if (ok && json.ok === true) {
				setSubmitting("success");
			} else {
				if (json.ok === false && Array.isArray(json.errors)) {
					setErrors(json.errors);
				}
				setSubmitting("error");
			}
		},
		[state, offerId]
	);

	if (submitting === "success") {
		return (
			<div className="sm:p-3 mb-6 mt-12 text-center md:h-96 flex justify-center flex-col">
				<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					{t("reagovat.sent")}
				</h2>
				<p className="mt-2">{t("reagovat.notice")}</p>
				<div className="text-center mt-10">
					<button
						type="submit"
						className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={onClose}
					>
						{t("reagovat.close")}
					</button>
				</div>
			</div>
		);
	}

	const disabled = submitting === "loading";
	return (
		<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
			<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
				{t("reagovat.contactVolunteer")}
			</h2>
			<p className="text-gray-400">ID pomoci: {code}</p>

			{submitting === "error" && (
				<div>
					<p>{t("reagovat.error")}</p>
				</div>
			)}
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					{t("reagovat.email")}
				</label>
				{errors.find((it) => it.input === "email") && (
					<div className="flex">
						<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
							{t(errors.find((it) => it.input === "email")!.code)}
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
					htmlFor="phone"
					className="block text-sm font-medium text-gray-700"
				>
					{t("reagovat.phone")}
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
				{t("reagovat.consent")}{" "}
				<a
					className="underline underline-offset-2 hover:no-underline"
					target="_blank"
					href="/souhlas-a-informace-o-zpracovani-pomahejukrajine-cz.pdf"
				>
					{t("reagovat.consentLink")}
				</a>
			</div>
			<div className="text-center">
				<button
					type="submit"
					disabled={disabled}
					className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{t("reagovat.submit")}
				</button>
			</div>
			<div>
				{errors.length > 0 && (
					<p className="text-center">{t("reagovat.checkFormData")}</p>
				)}
			</div>
		</form>
	);
});
