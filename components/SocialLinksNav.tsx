import Link from "next/link";
import Image from "next/image";

const socialLinks = [
	{ href: "https://twitter.com/pomahejukrajine", icon: "/twitter.svg" },
	{
		href: "https://www.instagram.com/pomahejukrajine.cz",
		icon: "/instagram.svg",
	},
	{
		href: "https://www.facebook.com/PomahejUkrajine.cz",
		icon: "/facebook.svg",
	},
];

const SocialLinksNav = ({ size = 22 }) => (
	<>
		{socialLinks.map((link) => (
			<Link href={link.href} key={link.href}>
				<a>
					<Image src={link.icon} width={size} height={size} />
				</a>
			</Link>
		))}
	</>
);

export default SocialLinksNav;
