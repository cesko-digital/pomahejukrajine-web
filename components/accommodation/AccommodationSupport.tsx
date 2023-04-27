import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BlueGradient } from "./Gradient";
import { WhiteLink } from "./WhiteLink";

export const AccommodationSupport = () => {
	const { t } = useTranslation("accommodation");

	return (
		<section id="howItWorks" className="py-8 relative">
			<BlueGradient />

			<div className={"mx:container mx-auto text-center"}>
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
					{t("ubytovani:accommodationSupport.title")}
				</h2>
				<p
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text`),
					}}
				/>
				<p
					className="pt-20"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text2`),
					}}
				/>
				<p
					className="pt-4"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text3`),
					}}
				/>
				<p
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text4`),
					}}
				/>
				<p
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text5`),
					}}
				/>

				<Boxes />

				<p
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text6`),
					}}
				/>

				<WhiteLink
					type={"button"}
					link={"#aaa"}
					text={t("ubytovani:accommodationSupport.button1")}
				/>

				<Boxes />
			</div>
		</section>
	);
};

const Boxes = () => {
	const { t } = useTranslation("accommodation");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-ful p-4">
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center p-4">
				<Image width={88} height={58} src={`/ubytovani/house.svg`} />
				<h4>
					<strong>{t("ubytovani:accommodationSupport.box1.title")}</strong>
				</h4>
				<strong>
					<p
						dangerouslySetInnerHTML={{
							__html: t(`ubytovani:accommodationSupport.box1.title.small`),
						}}
					/>
				</strong>
				<p
					className="pt-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box1.text`),
					}}
				/>
			</div>
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center p-4">
				<Image width={88} height={58} src={`/ubytovani/two-houses.svg`} />
				<h4>
					<strong>{t("ubytovani:accommodationSupport.box1.title")}</strong>
				</h4>
				<strong>
					<p
						dangerouslySetInnerHTML={{
							__html: t(`ubytovani:accommodationSupport.box1.title.small`),
						}}
					/>
				</strong>
				<p
					className="pt-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box1.text`),
					}}
				/>
			</div>
		</div>
	);
};
