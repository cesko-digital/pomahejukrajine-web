/* eslint-disable react/display-name */
import { FormEvent, memo, useCallback, useState } from "react";
import { ReactionForm, ReactionPayload } from "../lib/reaction";
import { FormError } from "../lib/shared";
import { useTranslation } from "next-i18next";
import { BREAKTPOINTS } from "../utils/constants";

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

			if (ok && json.ok) {
				setSubmitting("success");
			} else {
				if (!json.ok && Array.isArray(json.errors)) {
					setErrors(json.errors);
				}
				setSubmitting("error");
			}
		},
		[state, offerId]
	);

	if (submitting === "success") {
		return (
			<div className="sm:p-3 my-[177px] md:my-[115px] text-center md:h-96 flex justify-center flex-col text-black">
				<h2 className="text-3xl font-extrabold tracking-tightsm:text-3xl">
					{t("reagovat.sent")}
				</h2>
				<p className="mt-2">{t("reagovat.notice")}</p>
				<div className="text-center mt-10">
					<button
						type="submit"
						className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ua-blue hover:bg-ua-blue-dark transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={onClose}
					>
						{t("reagovat.close")}
					</button>
				</div>
			</div>
		);
	}

	const disabled = submitting === "loading";
	const isDesktop = window?.innerWidth > BREAKTPOINTS.MD ?? true;

	return (
		<form
			className="grid grid-cols-1 gap-y-2 sm:gap-x-8 text-black"
			onSubmit={submit}
		>
			<h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl">
				{t("reagovat.contactVolunteer")}
			</h2>
			<p className="text-gray-400 text-xs md:pb-16">ID pomoci: {code}</p>

			{submitting === "error" && (
				<div>
					<p>{t("reagovat.error")}</p>
				</div>
			)}

			<div>
				<label htmlFor="email" className="block text-sm font-medium">
					{t("reagovat.email")}
				</label>
				{errors.find((it) => it.input === "email") && (
					<div className="flex">
						<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
							{t(errors.find((it) => it.input === "email")!.code)}
						</div>
					</div>
				)}
				<div className="mt-2">
					<input
						disabled={disabled}
						type="email"
						id="email"
						required
						value={state.email}
						onChange={(e) => setState({ ...state, email: e.target.value })}
						className="py-1.5 px-4 block w-9/12 shadow-sm focus:ring-ua-blue focus:border-ua-blue border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="phone" className="block text-sm font-medium">
					{t("reagovat.phone")}
				</label>
				{errors.find((it) => it.input === "phone") && (
					<div className="flex">
						<div className="my-2 text-sm text-white bg-red-500 p-2 rounded-md">
							{t(errors.find((it) => it.input === "phone")!.code)}
						</div>
					</div>
				)}
				<div className="mt-2">
					<input
						disabled={disabled}
						type="text"
						id="phone"
						required
						minLength={9}
						value={state.phone}
						onChange={(e) => setState({ ...state, phone: e.target.value })}
						className="py-1.5 px-4 block w-9/12 shadow-sm focus:ring-ua-blue focus:border-ua-blue border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="text" className="block text-sm font-medium">
					{t("reagovat.text")}
				</label>
				<div className="mt-2">
					<textarea
						disabled={disabled}
						id="text"
						rows={isDesktop ? 7 : 5}
						required
						value={state.text}
						onChange={(e) => setState({ ...state, text: e.target.value })}
						className="py-1.5 px-4 block w-full shadow-sm focus:ring-ua-blue focus:border-ua-blue border-gray-300 rounded-md resize-none"
					/>
				</div>
			</div>

			<div className="text-grey-dark mt-8">
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
					className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ua-blue hover:bg-ua-blue-dark transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
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
