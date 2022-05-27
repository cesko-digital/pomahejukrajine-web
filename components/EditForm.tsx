/* eslint-disable react/display-name */
import Link from "next/link";
import { FormEvent, memo, useCallback, useState } from "react";
import { QuestionValue, PublicQueryResult, FormError } from "../lib/shared";
import { QuestionControl } from "./QuestionControl";
import { default as Select } from "react-select";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CZECH } from "../utils/constants";

interface RegisterFormProps extends PublicQueryResult {
	offerId: string;
	offerTypeId: string;
	offerCreatedAt: string;
	offerStatusType: "outdated" | "capacity_exhausted" | "active";
	questions: {
		[id: string]: QuestionValue;
	};
}

export const EditForm = memo<RegisterFormProps>(
	({
		districts,
		offerId,
		offerTypeId,
		questions,
		offerTypes,
		offerStatusType,
		offerCreatedAt,
	}) => {
		const offerType = offerTypes.find((o) => o.id === offerTypeId)!;
		const [submitting, setSubmitting] = useState<
			false | "loading" | "error" | "success"
		>(false);
		const [errors, setErrors] = useState<FormError[]>([]);
		const [state, setState] = useState(questions);
		const [statusState, setStatusState] = useState(offerStatusType);
		const { t } = useTranslation();
		const { locale } = useRouter();

		const submit = useCallback(
			async (e: FormEvent) => {
				e.preventDefault();

				if (
					offerStatusType === "outdated" ||
					offerStatusType === "capacity_exhausted"
				) {
					await fetch("/api/updateOfferStatus", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							offerId,
							offerStatus: statusState,
						}),
					});
				} else if (
					statusState === "outdated" ||
					statusState === "capacity_exhausted"
				) {
					await fetch("/api/updateOfferStatus", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							offerId,
							offerStatus: statusState,
						}),
					});
				}

				const response = await fetch("/api/updateOffer/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						offerId,
						data: state,
						isUKLanguage: locale !== CZECH,
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
			[state, offerId, statusState, offerStatusType]
		);

		if (submitting === "success") {
			return (
				<>
					<div className="p-2 text-lg text-center bg-blue-600 rounded-lg shadow-lg sm:p-3">
						<p className="mx-3 font-medium text-white">{t("nabidka.edited")}</p>
					</div>
					<div className="flex justify-center mt-3">
						<Link href="/moje-nabidky">
							<a className="inline-block px-4 py-2 text-base font-medium text-blue-600 border border-transparent bg-blue-50 rounded-md hover:bg-blue-100">
								{t("nabidka.backToMyOffers")}
							</a>
						</Link>
					</div>
				</>
			);
		}

		const disabled = submitting === "loading";
		const statusLable: any = {
			outdated: t("nabidka.outdated"),
			capacity_exhausted: t("nabidka.capacityExhausted"),
		};
		const createdAt = new Date(offerCreatedAt);

		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<div>{submitting === "error" && <p>{t("nabidka.error")}</p>}</div>
				<div className="mt-1">
					{errors.find((it) => it.input === "offer") !== undefined && (
						<div className="flex">
							<div className="p-2 my-2 text-sm text-white bg-red-500 rounded-md">
								{errors.find((it) => it.input === "offer")!.message}
							</div>
						</div>
					)}
					<div className="mt-1">
						<div className="flex flex-row items-center justify-between">
							<h3 className="text-lg font-bold">
								{locale === CZECH ? offerType.name : offerType.nameUK}
							</h3>
							<span className="text-sm font-bold text-gray-400">
								{t("mojeNabidky.created")} {createdAt.toLocaleDateString()}
							</span>
						</div>
						<div className="pl-4 mt-2 mb-4 ml-2 border-l-4 border-blue-600">
							<div>
								<div className="mt-1 mb-4">
									<label>{t("nabidka.stav")}</label>
									<Select
										isClearable={false}
										options={[
											{ value: "active", label: t("nabidka.active") },
											{ value: "outdated", label: t("nabidka.outdated") },
											{
												value: "capacity_exhausted",
												label: t("nabidka.capacityExhausted"),
											},
										]}
										defaultValue={
											Object.keys(statusLable).includes(offerStatusType)
												? {
														value: offerStatusType,
														label: statusLable[offerStatusType],
												  }
												: { value: offerStatusType, label: t("nabidka.active") }
										}
										onChange={(option) =>
											setStatusState(option?.value ? option.value : "active")
										}
									/>
								</div>
							</div>

							{offerType.infoText && (
								<p>
									{locale === CZECH ? offerType.infoText : offerType.infoTextUK}
								</p>
							)}
							{offerType.questions.map((question) => (
								<QuestionControl
									key={question.id}
									definition={question}
									value={state[question.id] ?? {}}
									onChange={(newValue) => {
										newValue.type = question.type;
										setErrors((errors) =>
											errors.filter(
												(it) =>
													it.input === "question" &&
													it.questionId !== question.id
											)
										);
										setState((state) => ({
											...state,
											[question.id]: newValue,
										}));
									}}
									disabled={disabled}
									districts={districts}
									error={
										errors.find(
											(it) =>
												it.input === "question" && it.questionId === question.id
										)?.message
									}
								/>
							))}
						</div>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={disabled}
						className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						{t("nabidka.submit")}
					</button>
				</div>
				<div>
					{errors.length > 0 && (
						<p className="text-center">{t("nabidka.checkForm")}</p>
					)}
				</div>
			</form>
		);
	}
);
