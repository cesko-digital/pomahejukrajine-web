import Link from "next/link";
import { useRouter } from "next/router";
import HamburgerIcon from "./HamburgerIcon";
import styles from "./MainNav.module.css";
import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import SocialLinksNav from "./SocialLinksNav";
import UserIcon from "./userIcon";

const NavLinks: React.FC<{
	normalStyle: string;
	activeStyle: string;
	showHome?: boolean;
	showMyOffers?: boolean;
	myOffersStyle?: string;
}> = ({ normalStyle, activeStyle, showHome, showMyOffers, myOffersStyle }) => {
	const router = useRouter();
	const isHomepage = router.route === "/";

	const links: Record<string, string> = {
		"/": "Úvod",
		"/nabidka": "Nabízím pomoc",
		"/nabidky": "Sháním pomoc",
		"/faq": "Časté otázky",
		"/moje-nabidky": "Moje nabídky",
		// "/dulezite-info": "Důležité informace", // Uncomment when we have the content
		// "/o-nas": "Více o Pomáhej Ukrajině",
	};

	return (
		<>
			{Object.keys(links).map((key) => {
				// if (isHomepage && (key === "/nabidka" || key === "/nabidky")) {
				// 	return null;
				// }

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
			<div className="lg:hidden flex justify-end p-3 -mr-3">
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
								className="absolute top-2 right-2 p-3 pr-2"
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
							<div className="flex gap-6 flex-1 items-end">
								<SocialLinksNav />
							</div>
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
				className="font-bold hidden lg:block lg:space-x-2 xl:space-x-6"
				data-testid="menu"
			>
				<NavLinks normalStyle={styles.link} activeStyle={styles.activeLink} />

				{/*
		<Link href="/moje-nabidky">
			<a className="inline-block bg-blue-50 py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-100">
				Můj profil
			</a>
		</Link> */}
			</div>
		</>
	);
};

export default MainNav;
