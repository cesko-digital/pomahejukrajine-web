import Image from "next/image";
import Link from "next/link";

const socialLinks = [
	{
		href: "https://twitter.com/pomahejukrajine",
		icon: "/twitter.svg",
		alt: "twitter",
	},
	{
		href: "https://www.instagram.com/pomahejukrajine.cz",
		icon: "/instagram.svg",
		alt: "instagram",
	},
	{
		href: "https://www.facebook.com/PomahejUkrajine.cz",
		icon: "/facebook.svg",
		alt: "facebook",
	},
];

const SocialLinksNav = ({ className = "", size = 22 }) => (
	<div className={`flex ${className}`}>
		{socialLinks.map((link) => (
			<Link href={link.href} key={link.href}>
				<a className="inline-flex hover:opacity-80">
					<Image src={link.icon} width={size} height={size} alt={link.alt} />
				</a>
			</Link>
		))}
	</div>
);

export default SocialLinksNav;
