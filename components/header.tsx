import Link from "next/link";
import Logo from "./Logo";
import MainNav from "./MainNav";
import styles from "./MainNav.module.css";
import SocialLinksNav from "./SocialLinksNav";
import UserIcon from "./userIcon";
import { useTranslation } from "next-i18next";
import LangageSelect from "./LanguageSelect";

export default function Header() {
	const { t } = useTranslation();

	return (
		<header className="bg-grey-light sticky top-0 z-10 shadow-header">
			<nav
				className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-3.5 md:py-3"
				aria-label="Top"
			>
				<div className="flex items-center justify-between w-full lg:items-start">
					<div className="flex items-center" data-testid="logo">
						<Link href="/">
							<a className="block w-56 md:w-80 h-30">
								<Logo />
							</a>
						</Link>
					</div>
					<div className="flex items-center justify-end lg:block">
						<LangageSelect className="lg:hidden" />
						<div
							className="items-center justify-end hidden text-gray-600 gap-x-6 pb-3 lg:flex"
							data-testid="social-links"
						>
							<LangageSelect />
							<Link href="/moje-nabidky" key="/moje-nabidky">
								<a className={styles.myOffersDesktop}>
									<UserIcon />
									{t("header.myOffers")}
								</a>
							</Link>
							<SocialLinksNav className="items-center gap-x-2" />
						</div>
						<MainNav />
					</div>
				</div>
			</nav>
		</header>
	);
}
