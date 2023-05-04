import { useTranslation } from "next-i18next";
import { BlueGradient } from "./accommodation/Gradient";

const FormInput = () => {
	const { t } = useTranslation("ubytovani");

	return (
		<div className="flex flex-col justify-center items-center">
			<BlueGradient />
			<h2 className="text-[30px] font-bold pt-8">
				{t("ubytovani:registerForm.header")}
			</h2>
			<p
				className={"text-center pt-4 pb-12"}
				dangerouslySetInnerHTML={{
					__html: t("ubytovani:registerForm.text"),
				}}
			/>
		</div>
	);
};

export default FormInput;
