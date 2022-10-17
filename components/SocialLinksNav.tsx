import Image from "next/image";
import Link from "next/link";

const SocialLinksNav = ({ className = "", size = 22 }) => (
	<div className={`flex ${className}`}>
		<Link href="https://www.facebook.com/PomahejUkrajine.cz">
			<a className="inline-flex hover:opacity-80" target="_blank">
				<Image src="/facebook.svg" width={size} height={size} alt="facebook" />
			</a>
		</Link>
	</div>
);

export default SocialLinksNav;
