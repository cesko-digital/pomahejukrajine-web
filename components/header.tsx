import Logo from "./Logo";
import MainNav from "./MainNav";
import SocialLinksNav from "./SocialLinksNav";

export default function Header() {
	return (
		<header className="bg-white">
			<nav
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
				aria-label="Top"
			>
				<div className="w-full flex items-center lg:items-start justify-between">
					<div className="flex items-center" data-testid="logo">
						<a href="/" className="block w-60 md:w-80 h-30">
							<Logo />
						</a>
					</div>
					<div>
						<div
							className="justify-end space-x-2 pb-5 hidden lg:flex"
							data-testid="social-links"
						>
							<SocialLinksNav />
						</div>
						<MainNav />
					</div>
				</div>
			</nav>
		</header>
	);
}
