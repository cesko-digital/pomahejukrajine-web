import Link from "next/link";
import { useRouter } from "next/router";
import HamburgerIcon from "./HamburgerIcon";
import styles from "./MainNav.module.css";
import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import SocialLinksNav from "./SocialLinksNav";
import UserIcon from "./userIcon";
import { useTranslation } from "next-i18next";

const NavLinks: React.FC<{
	normalStyle: string;
	activeStyle: string;
	showHome?: boolean;
	showMyOffers?: boolean;
	myOffersStyle?: string;
}> = ({ normalStyle, activeStyle, showHome, showMyOffers, myOffersStyle }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const isHomepage = router.route === "/";

	const links: Record<string, string> = {
		"/": t("header.main"),
		"/nabidka": t("header.offerHelp"),
		"/nabidky": t("header.needHelp"),
		"/faq": t("header.faq"),
		"https://migracnikonsorcium.cz/cs/": t("header.information"),
		"https://migracnikonsorcium.cz/cs/pomahej-ukrajine/o-platforme-pomahej-ukrajine/":
			t("header.moreAboutProject"),
		"/moje-nabidky": t("header.myOffers"),
	};

	return (
		<>
			{Object.keys(links).map((key) => {
				if (isHomepage && (key === "/nabidka" || key === "/nabidky")) {
					return null;
				}

				if (!showHome && key === "/") {
					return null;
				}

				if (key === "/moje-nabidky") {
					if (!showMyOffers) return null;
					return (
						<Link href={key} key={key}>
							<a className={myOffersStyle}>
								<UserIcon />
								{links[key]}
							</a>
						</Link>
					);
				}

				return (
					<Link href={key} key={key}>
						<a className={router.route === key ? activeStyle : normalStyle}>
							{links[key]}
						</a>
					</Link>
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
			<div className="flex justify-end p-3 -mr-3 lg:hidden">
				<div onClick={() => setIsOpen(true)}>
					<HamburgerIcon />
				</div>
			</div>
			<Transition show={isOpen}>
				<Dialog onClose={() => setIsOpen(false)} initialFocus={dummyRef}>
					<div ref={dummyRef} className="hidden">
						This is here to steal the horribly looking focus after the dialog
						opens
					</div>
					<Transition.Child
						enter="transition duration-200 ease-out"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition duration-200 ease-in"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 flex flex-col bg-white" />
						<div className={styles.mobileNav}>
							<div className="flex-1" />
							<div
								className="absolute p-3 pr-2 top-2 right-2"
								onClick={() => setIsOpen(false)}
							>
								<CloseIcon />
							</div>
							<NavLinks
								showHome
								showMyOffers
								myOffersStyle={styles.myOffers}
								normalStyle={styles.mobileLink}
								activeStyle={styles.activeMobileLink}
							/>
							<SocialLinksNav className="items-end flex-1 gap-x-6" />
						</div>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
};

const MainNav = () => {
	const router = useRouter();

	const isHomepage = router.route === "/";

	return (
		<>
			<HamburgerMenu />
			<div
				className="hidden font-bold lg:block space-x-2 xl:space-x-6"
				data-testid="menu"
			>
				<NavLinks normalStyle={styles.link} activeStyle={styles.activeLink} />

				{/*
		<Link href="/moje-nabidky">
			<a className="inline-block px-4 py-2 text-base font-medium text-blue-600 border border-transparent bg-blue-50 rounded-md hover:bg-blue-100">
				M??j profil
			</a>
		</Link> */}
			</div>
		</>
	);
};

export default MainNav;
