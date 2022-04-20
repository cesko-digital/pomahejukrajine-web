import Link from "next/link";
import Logo from "./Logo";
import MainNav from "./MainNav";
import styles from "./MainNav.module.css";
import SocialLinksNav from "./SocialLinksNav";
import UserIcon from "./userIcon";

export default function Header() {
	return (
		<header className="bg-white">
			<nav
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-5"
				aria-label="Top"
			>
				<div className="w-full flex items-center lg:items-start justify-between">
					<div className="flex items-center" data-testid="logo">
						<Link href="/">
							<a className="block w-56 md:w-80 h-30">
								<Logo />
							</a>
						</Link>
					</div>
					<div>
						<div
							className="justify-end items-center space-x-2 pb-7 hidden lg:flex"
							data-testid="social-links"
						>
							<Link href="/moje-nabidky" key="/moje-nabidky">
								<a className={styles.myOffersDesktop}>
									<UserIcon />
									Moje nabídky
								</a>
							</Link>
							<SocialLinksNav />
						</div>
						<MainNav />
					</div>
				</div>
			</nav>
		</header>
	);
}
