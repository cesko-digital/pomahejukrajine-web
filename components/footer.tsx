import { useTranslation } from "next-i18next";

const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className="bg-footer-grey text-center text-grey-dark text-footer leading-relaxed	mt-12 px-6 pt-20 pb-4 md:pt-36 md:mt-6">
			<p>
				{t("footer.line1")}
				<br />
				{t("footer.line2")}
			</p>
		</footer>
	);
};

export default Footer;
