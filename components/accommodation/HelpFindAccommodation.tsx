import Link from "next/link";
import { useTranslation } from "next-i18next";

export const HelpFindAccommodation = () => {
	const { t } = useTranslation(["common", "ubytovani"]);

	return (
		<section className="bg-yellow-lightest text-center px-4 py-6 md:py-11 flex justify-center">
			<div className="max-w-[1010px] px-3">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-7">
					{t("ubytovani:helpFindAccommodation.title")}
				</h2>
				{[...Array(5)].map((_, i) => (
					<p
						key={i}
						className="leading-7 mb-4"
						dangerouslySetInnerHTML={{
							__html: t(`ubytovani:helpFindAccommodation.line${i + 1}`),
						}}
					/>
				))}
				<div className="flex justify-center flex-col md:flex-row gap-3 mt-10 md:mt-14">
					<Link href="#offerAccommodation">
						<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-full md:w-[225px] p-4 flex mr-0 md:mr-4 justify-center items-center hover:bg-ua-blue-dark transition duration-150">
							{t("ubytovani:howItWorks.button")}
						</a>
					</Link>
					<Link href="#howItWorks">
						<a className="text-ua-blue text-[18px] font-bold border-2 border-ua-blue rounded-md w-full md:w-[225px] py-4 flex justify-center items-center hover:bg-ua-blue-dark hover:text-white transition duration-150">
							{t("ubytovani:helpFindAccommodation.button2")}
						</a>
					</Link>
				</div>
				<div className="mt-4 md:mt-7 mb-8 md:mb-0">
					<Link href="#makeItClear">
						<a className="text-[16px] font-bold underline">
							{t("ubytovani:helpFindAccommodation.link")}
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
};
