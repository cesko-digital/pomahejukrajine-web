import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BlueGradient } from "./Gradient";
import { WhiteLink } from "./WhiteLink";

export const AccommodationSupport = () => {
	const { t } = useTranslation("accommodation");

	return (
		<section id="howItWorks" className="py-8 relative">
			<BlueGradient />

			<div
				className={
					"mx:container mx-auto text-center md:ml-20 md:mr-20 lg:ml-40 lg:mr-40 2xl:ml-[600px] 2xl:mr-[600px]"
				}
			>
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mt-8 mb-4 md:mt-6 md:mb-12">
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
					className="pt-4 pb-4"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text5`),
					}}
				/>

				<Boxes textType="B" />

				<p
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text6`),
					}}
				/>

				<WhiteLink
					type={"button"}
					link={"https://davkyuk.mpsv.cz/jazyk"}
					text={t("ubytovani:accommodationSupport.button1")}
				/>

				<p
					className="pt-20"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text7`),
					}}
				/>

				<p
					className="pt-4 pb-8"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text8`),
					}}
				/>
				
				<p
					className="pb-4"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.text5`),
					}}
				/>

				<Boxes_2 textType="B" />
				<div className="text-center font-[-15px] md:mt-5 md:mb-12">
					<ul className="inline-block text-left list-disc">
						<p
							dangerouslySetInnerHTML={{
								__html: t(`ubytovani:accommodationSupport.text9`),
							}}
						/>
						<li
							className="ml-8"
							dangerouslySetInnerHTML={{
								__html: t(`ubytovani:accommodationSupport.li1`),
							}}
						/>
						<li
							className="ml-8"
							dangerouslySetInnerHTML={{
								__html: t(`ubytovani:accommodationSupport.li2`),
							}}
						/>
					</ul>
				</div>
			</div>
		</section>
	);
};

const Boxes = ({ textType }: { textType: "B" | null }) => {
	const { t } = useTranslation("accommodation");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-ful p-4">
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center pt-7 pb-7 md:pt-8 md:pt-9">
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
					className="p-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box1.text`),
					}}
				/>
			</div>
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center pt-7 pb-7 md:pt-8 md:pb-9">
				<Image width={88} height={58} src={`/ubytovani/two-houses.svg`} />
				<h4>
					<strong>{t("ubytovani:accommodationSupport.box2.title")}</strong>
				</h4>
				<strong>
					<p
						dangerouslySetInnerHTML={{
							__html: t(`ubytovani:accommodationSupport.box2.title.small`),
						}}
					/>
				</strong>
				<p
					className="p-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box2.text`),
					}}
				/>
			</div>
		</div>
	);
};

const Boxes_2 = ({ textType }: { textType: "B" | null }) => {
	const { t } = useTranslation("accommodation");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-ful p-4">
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center pt-7 pb-7 md:pt-8 md:pt-9">
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
					className="p-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box1.text${textType}`),
					}}
				/>
			</div>
			<div className="w-full h-full rounded-md bg-yellow-lightest text-center pt-7 pb-7 md:pt-8 md:pb-9">
				<Image width={88} height={58} src={`/ubytovani/two-houses.svg`} />
				<h4>
					<strong>{t("ubytovani:accommodationSupport.box2.title")}</strong>
				</h4>
				<strong>
					<p
						dangerouslySetInnerHTML={{
							__html: t(`ubytovani:accommodationSupport.box2.title.small`),
						}}
					/>
				</strong>
				<p
					className="p-6"
					dangerouslySetInnerHTML={{
						__html: t(`ubytovani:accommodationSupport.box2.text${textType}`),
					}}
				/>
			</div>
		</div>
	);
};
