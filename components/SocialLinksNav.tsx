import Image from "next/image";
import Link from "next/link";

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
				<a className="inline-flex hover:opacity-80">
					<Image src={link.icon} width={size} height={size} />
				</a>
			</Link>
		))}
	</>
);

export default SocialLinksNav;
