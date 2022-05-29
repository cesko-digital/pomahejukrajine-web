import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import cx from "classnames";
import styles from "./LanguageSelect.module.css";

const LangageSelect = ({ className = "" }) => {
	const router = useRouter();
	const { locales, locale } = router;
	const otherLocales = locales?.filter((it) => it !== locale) ?? [];
	return (
		<Menu
			as="div"
			className={`relative pr-4 text-xl font-normal lg:text-lg text-ua-blue lg:text-gray-600 ${className}`}
		>
			{({ open }) => (
				<>
					<Menu.Button as="div" className="cursor-pointer lg:hover:opacity-80 ">
						{locale}
						<i
							className={cx(
								styles.icon,
								open ? styles.arrowUp : styles.arrowDown
							)}
						/>
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Menu.Items className="absolute flex flex-col items-start top-8 lg:top-6 focus:outline-none">
							{otherLocales.map((otherLocale) => {
								const { pathname, query, asPath } = router;
								return (
									<Menu.Item key={otherLocale}>
										<Link
											href={{ pathname, query }}
											as={asPath}
											locale={otherLocale}
										>
											<a className="lg:hover:opacity-80">{otherLocale}</a>
										</Link>
									</Menu.Item>
								);
							})}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default LangageSelect;
