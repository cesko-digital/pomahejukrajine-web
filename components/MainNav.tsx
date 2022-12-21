import Link from "next/link";
import { useRouter } from "next/router";
import HamburgerIcon from "./HamburgerIcon";
import styles from "./MainNav.module.css";
import { Dialog } from "@headlessui/react";
import React, { useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import SocialLinksNav from "./SocialLinksNav";
import UserIcon from "./userIcon";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const NavLinks: React.FC<{
	normalStyle: string;
	activeStyle: string;
	showMyOffers?: boolean;
	myOffersStyle?: string;
}> = ({ normalStyle, activeStyle, showMyOffers, myOffersStyle }) => {
	const router = useRouter();
	const { t } = useTranslation();

	const links: Record<string, string> = {
		"/nabidka": t("header.offerHelp"),
		"/nabidky/[id]": t("header.needHelp"),
		"/faq": t("header.faq"),
		"https://coda.io/d/Ukrajina_dzasdxTf153/Zakladni-odkazy-a-obecne-informace-k-podpore-uprchliku-z-Ukrajin_suDG4":
			t("header.information"),
		"https://migracnikonsorcium.cz/cs/pomahej-ukrajine-v-grafech/": t(
			"header.moreAboutProject"
		),
		"/moje-nabidky": t("header.myOffers"),
	};

	return (
		<>
			{Object.keys(links).map((key) => {
				if (key === "/moje-nabidky") {
					if (!showMyOffers) return null;
					return (
						<Link href={key} key={key}>
							<a
								className={`${myOffersStyle}${
									key === router.route ? " active" : ""
								}`}
							>
								<UserIcon />
								{links[key]}
							</a>
						</Link>
					);
				}

				return (
					<div
						key={key}
						className={`${router.route === key ? activeStyle : normalStyle}${
							key === router.route ? " active" : ""
						}`}
					>
						<Link href={key}>
							<a target={key.startsWith("https://") ? "_blank" : "_self"}>
								{links[key]}
								{key.startsWith("https://") && (
									<span className="ml-1.5">
										<Image
											src="/newTabIcon.svg"
											width={12}
											height={12}
											alt="otevrit v novem okne"
										/>
									</span>
								)}
							</a>
						</Link>
					</div>
				);
			})}
		</>
	);
};

const HamburgerMenu = () => {
	let [isOpen, setIsOpen] = useState(false);
	let dummyRef = useRef(null);

	return (
		<>
			<div className="flex justify-end py-3 pl-5 lg:hidden">
				<div onClick={() => setIsOpen(true)}>
					<HamburgerIcon />
				</div>
			</div>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				initialFocus={dummyRef}
			>
				<div ref={dummyRef} className="hidden">
					This is here to steal the horribly looking focus after the dialog
					opens
				</div>
				<Dialog.Overlay className="fixed inset-0 flex flex-col bg-white z-10" />
				<div className={styles.mobileNav}>
					<div
						className="absolute top-6 right-4"
						onClick={() => setIsOpen(false)}
					>
						<CloseIcon />
					</div>
					<div className="flex flex-col justify-center items-center h-full">
						<div className="flex flex-col justify-center items-center grow">
							<NavLinks
								showMyOffers
								myOffersStyle={styles.myOffers}
								normalStyle={styles.mobileLink}
								activeStyle={styles.activeMobileLink}
							/>
						</div>
						<SocialLinksNav className="grow-0" />
					</div>
				</div>
			</Dialog>
		</>
	);
};

const MainNav = () => {
	return (
		<>
			<HamburgerMenu />
			<div
				className="hidden font-bold lg:block space-x-2 xl:space-x-6"
				data-testid="menu"
			>
				<NavLinks normalStyle={styles.link} activeStyle={styles.activeLink} />
			</div>
		</>
	);
};

export default MainNav;
