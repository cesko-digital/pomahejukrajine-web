import { useTranslation } from "next-i18next";
import { BlueGradient } from "./accommodation/Gradient";
import React from "react";

export type RegisterFormProps = {
	header?: string;
	text?: any;
};

const FormInput: React.FC<RegisterFormProps> = ({ header, text }) => {
	const { t } = useTranslation("ubytovani");

	return (
		<div className="flex flex-col justify-center items-center">
			<BlueGradient />
			<div className="flex justify-inline text-center">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl">{header}</h2>
			</div>

			<p
				className={"text-center pt-4"}
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			/>
		</div>
	);
};

export default FormInput;
