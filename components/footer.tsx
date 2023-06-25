import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";
import facebook from "./footerIcons/facebook.svg";
import instagram from "./footerIcons/instagram.svg";
import twitter from "./footerIcons/twitter.svg";
import email from "./footerIcons/email.svg";

const Footer = () => {
	const { t } = useTranslation();

	const links: Record<string, string> = {
		"/nabidka": t("header.offerHelp"),
		"/nabidky/3a0731d3-2102-4a7b-a5c4-096e0876f10b": t("header.needHelp"),
		"/ubytovani": t("header.accommodation"),
		"/faq": t("header.faq"),
		"https://coda.io/d/Ukrajina_dzasdxTf153/Zakladni-odkazy-a-obecne-informace-k-podpore-uprchliku-z-Ukrajin_suDG4":
			t("header.information"),
		"https://migracnikonsorcium.cz/cs/pomahej-ukrajine-v-grafech/": t(
			"header.moreAboutProject"
		),
	};

	return (
		<footer className="bg-ua-blue-dark text-white md:px-[62px] pt-[50px] md:pt-[68px] pb-[84px] md:pb-[99px]">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center md:text-left">
				<div className="order-1">
					<p className="text-[19px] md:text-[18px] leading-[27px] font-bold">
						{t("footer.followUs")}:
					</p>
					<div className="flex flex-row gap-6 mt-6 md:mt-5 mb-[68px] md:mb-0 justify-center md:justify-start">
						<Link href="https://www.facebook.com/PomahejUkrajine.cz">
							<a className="inline-flex hover:opacity-80" target="_blank">
								<Image src={facebook} alt="facebook" />
							</a>
						</Link>
						<Link href="https://www.instagram.com/pomahejukrajine.cz/">
							<a className="inline-flex hover:opacity-80" target="_blank">
								<Image src={instagram} alt="instagram" />
							</a>
						</Link>
						<Link href="https://twitter.com/pomahejukrajine">
							<a className="inline-flex hover:opacity-80" target="_blank">
								<Image src={twitter} alt="twitter" />
							</a>
						</Link>
					</div>
				</div>
				<div className="order-3 md:order-2">
					<p className="text-[19px] md:text-[18px] leading-[27px] font-bold">
						{t("footer.navigation")}:
					</p>
					<nav>
						<ul className="pt-[15px] flex flex-col gap-4 md:gap-1">
							{Object.keys(links).map((key) => (
								<li
									key={key}
									className="text-base md:text-[15px] leading-6 md:leading-[26px] hover:underline"
								>
									<Link href={key}>
										<a target={key.startsWith("https://") ? "_blank" : "_self"}>
											{links[key]}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="order-2 md:order-3">
					<p className="text-[19px] md:text-[18px] leading-[27px] font-bold">
						{t("footer.contactUs")}:
					</p>
					<div className="flex mt-[18px] md:mt-[14px] mb-[68px] md:mb-0 justify-center md:justify-start">
						<Image src={email} height={20} width={20} alt="email" />
						<a
							className="ml-2"
							href="mailto: pomahejukrajine@migracnikonsorcium.cz"
						>
							pomahejukrajine@migracnikonsorcium.cz
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
