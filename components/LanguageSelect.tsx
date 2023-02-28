import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import cx from "classnames";
import styles from "./LanguageSelect.module.css";

const LangageSelect = ({ className = "" }) => {
	const router = useRouter();
	const { locales, locale } = router;
	const otherLocales = locales?.filter((it) => it !== locale) ?? [];
	return (
		<Menu
			as="div"
			className={`w-[45px] relative pr-4 text-[21px] md:text-xl font-normal lg:text-lg text-ua-blue lg:text-gray-600 ${className} -mt-[3px]`}
		>
			{({ open }) => (
				<div
					className={`w-[45px] h-[33px] ${
						open ? "bg-ua-blue text-white rounded-t-[8px]" : ""
					}`}
				>
					<Menu.Button as="div" className="cursor-pointer lg:hover:opacity-80">
						<span className="pl-1 relative top-[-1px] left-[2px]">
							{locale}
						</span>
						<i
							className={cx(
								styles.icon,
								open ? styles.arrowUp : styles.arrowDown
							)}
						/>
					</Menu.Button>

					<Menu.Items className="w-[45px] h-[33px]  rounded-b-[8px] absolute flex flex-col items-start top-[33px] focus:outline-none text-ua-blue bg-[#D9D9D9] z-50 hover:bg-ua-blue hover:text-white">
						{otherLocales.map((otherLocale) => {
							const { pathname, query, asPath } = router;
							return (
								<Menu.Item key={otherLocale}>
									<Link
										href={{ pathname, query }}
										as={asPath}
										locale={otherLocale}
									>
										<a className="lg:hover:opacity-80 pl-1 relative top-[-1px] left-[2px]">
											{otherLocale}
										</a>
									</Link>
								</Menu.Item>
							);
						})}
					</Menu.Items>
				</div>
			)}
		</Menu>
	);
};

export default LangageSelect;
