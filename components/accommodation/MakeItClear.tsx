import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import styles from "../OfferFilter.module.css";
import cx from "classnames";

export const MakeItClear = () => {
	const { t } = useTranslation("ubytovani");
	const [isCollapsed, setCollapsed] = useState<boolean>(true);

	return (
		<section
			id="makeItClear"
			className="bg-yellow-lightest text-center py-6 md:py-11 justify-center w-full"
		>
			<div className=" w-full">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-6 md:mb-7">
					{t("ubytovani:makeItClear.title")}
				</h2>
			</div>

			<div className=" w-full">
				<div className="grid grid-cols-1 md:grid-cols-3 p-3">
					<div>
						<Card boxNumber={1} />
						<Card boxNumber={2} />
						<Card boxNumber={3} />
					</div>
					<div className={isCollapsed ? "hidden md:block" : ""}>
						<Card boxNumber={4} />
						<Card boxNumber={5} />
						<Card boxNumber={6} />
					</div>
					<div className={isCollapsed ? "hidden md:block" : ""}>
						<Card boxNumber={7} />
						<Card boxNumber={8} />
						<Card boxNumber={9} />
					</div>
				</div>
			</div>

			<div className="justify-center hidden md:flex">
				<Link href="#offerAccommodation">
					<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-[225px] py-4 mt-9 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
						{t("ubytovani:howItWorks.button")}
					</a>
				</Link>
			</div>

			<div className="flex justify-center md:hidden mx-8">
				{isCollapsed && (
					<button
						className={
							"text-ua-blue text-[18px] font-bold border-2 border-ua-blue rounded-md w-full md:w-[225px] py-4 flex justify-center items-center hover:bg-ua-blue-dark hover:text-white transition duration-150"
						}
						onClick={() => setCollapsed(false)}
					>
						{t("ubytovani:howItWorks.button2")}
					</button>
				)}
			</div>
		</section>
	);
};

const Card = ({ boxNumber }: { boxNumber: number }) => {
	const { t } = useTranslation("ubytovani");

	return (
		<div className=" m-3 p-6 bg-white rounded-lg h-auto">
			<h3 className="text-2xl font-bold">
				{t(`makeItClear.box${boxNumber}.title`)}
			</h3>
			<p>{t(`makeItClear.box${boxNumber}.text`)}</p>
		</div>
	);
};
