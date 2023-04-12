import { BlueGradient } from "./Gradient";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const ContactAndCommunication = () => {
	const { t } = useTranslation("accommodation");
	return (
		<section id="contact-and-communication" className="relative">
			<BlueGradient />

			<div className={"px-4 md:container md:mx-auto"}>
				<div className="max-w-[1010px] px-3">
					<div className="max-w-7xl mx-auto text-center py-8">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
							{t("ubytovani:contactAndCommunication.title")}
						</h2>
						<p>{t("ubytovani:contactAndCommunication.text")}</p>
					</div>
				</div>

				<div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
					<div>
						<div className=" m-3 p-6 bg-yellow-lightest rounded-lg h-auto">
							<h3 className="text-2xl font-bold">
								{t(`ubytovani:contactAndCommunication.boxTitle`)}
							</h3>
							<p className={"pt-4"}>
								{t(`ubytovani:contactAndCommunication.boxText1`)}
							</p>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.boxText2`),
								}}
							/>
						</div>
						<div className=" m-3 p-6 bg-ua-blue-lightest rounded-lg h-auto">
							<h3 className="text-2xl font-bold">
								{t(`ubytovani:contactAndCommunication.linksTitle`)}
							</h3>
							<p className={"pt-4"}>
								{t(`ubytovani:contactAndCommunication.link1.text`)}
							</p>
							<p className={"pt-4"}>
								{t(`ubytovani:contactAndCommunication.link2.text`)}
							</p>
							<p className={"pt-4"}>
								{t(`ubytovani:contactAndCommunication.link3.text`)}
							</p>
							<p className={"pt-4"}>
								{t(`ubytovani:contactAndCommunication.link4.text1`) +
									t(`ubytovani:contactAndCommunication.link4.text2`)}
							</p>
						</div>
					</div>

					<div>
						<Tip
							tipNumber={1}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={"#aaa"}
						/>
						<Tip
							tipNumber={2}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={"#aaa"}
						/>
						<Tip
							tipNumber={3}
							buttonText={t(`ubytovani:contactAndCommunication.button.visit`)}
							buttonLink={"#aaa"}
						/>
						<Tip
							tipNumber={4}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={"#aaa"}
						/>
						<Tip
							tipNumber={5}
							buttonText={t(
								`ubytovani:contactAndCommunication.button.moreInfo`
							)}
							buttonLink={"#aaa"}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

const Tip = ({
	tipNumber,
	buttonText,
	buttonLink,
}: {
	tipNumber: number;
	buttonText: string;
	buttonLink: string;
}) => {
	const { t } = useTranslation("accommodation");
	return (
		<div className={`flex py-4`}>
			<div className={"flex-none"}>
				<Image width={40} height={40} src={`/ubytovani/arrow2.svg`} />
			</div>
			<div className={"flex-grow relative"}>
				<h3 className={"text-2xl font-bold"}>
					{t(`ubytovani:contactAndCommunication.tip${tipNumber}.title`)}
				</h3>
				<p className={"py-2"}>
					{t(`ubytovani:contactAndCommunication.tip${tipNumber}.text`)}
				</p>

				<Link href={buttonLink}>
					<a
						className="block text-ua-blue text-[18px] font-bold border-2 border-ua-blue rounded-md w-full text-center
					 hover:bg-ua-blue-dark hover:text-white transition duration-150 p-1"
					>
						{buttonText}
					</a>
				</Link>
			</div>
		</div>
	);
};
