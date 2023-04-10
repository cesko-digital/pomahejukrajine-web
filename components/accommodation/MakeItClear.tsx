import { useTranslation } from "next-i18next";

export const MakeItClear = () => {
	const { t } = useTranslation("ubytovani");

	return (
		<section
			id="makeItClear"
			className="bg-ua-blue text-white text-center py-6 md:py-11 flex justify-center"
		>
			<div className="max-w-[1010px] px-3">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-7">
					{t("ubytovani:box.title")}
				</h2>
			</div>
		</section>
	);
};
