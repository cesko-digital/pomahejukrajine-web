import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { EditVolunteerFormState, Languages } from "../lib/shared";
import { Required } from "./Required";

interface EditVolunteerFormProps {
	languages: Languages;
	disabled?: boolean;
}

export const EditVolunteerForm = memo<EditVolunteerFormProps>(
	({ languages, disabled }) => {
		const [state, setState] = useState<EditVolunteerFormState>({
			name: "",
			phone: "+420",
			expertise: "",
			languages: [],
			contactHours: "kdykoliv",
			organization: "",
		});

		useEffect(() => {}, []);

		const submit = useCallback(async (e: FormEvent) => {}, []);

		return (
			<form className="grid grid-cols-1 gap-y-6 sm:gap-x-8" onSubmit={submit}>
				<div>
					<p className="mb-6">
						Položky označené{" "}
						<strong className="text-red-700 font-bold">*</strong> jsou povinné.
					</p>
					<label className="block text-sm font-medium text-gray-700">
						Jméno <Required />
					</label>
					<div className="mt-1">
						<input
							disabled={disabled}
							type="text"
							required
							value={state.name}
							onChange={(e) => setState({ ...state, name: e.target.value })}
							className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
						/>
					</div>
				</div>
			</form>
		);
	}
);

EditVolunteerForm.displayName = "EditVolunteerForm";
