import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const ContactAndCommunication = () => {
	const { t } = useTranslation("accommodation");
	return (
		<section id="contact-and-communication">
			<div className={"px-4 md:container md:mx-auto"}>
				<div className=" px-3">
					<div className="max-w-7xl mx-auto text-center py-8">
						<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
							{t("ubytovani:contactAndCommunication.title")}
						</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: t("ubytovani:contactAndCommunication.text"),
							}}
						/>
					</div>
				</div>

				<div className={"mb-20 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-1"}>
					<div>
						<div className=" mx-1 my-5 px-8 py-8 bg-yellow-lightest rounded-lg h-auto">
							<h3 className="h3 font-bold">
								{t(`ubytovani:contactAndCommunication.boxTitle`)}
							</h3>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.boxText1`),
								}}
							/>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.boxText2`),
								}}
							/>
						</div>
						<div className=" mx-1 my-5 px-8 pt-9 pb-20 bg-ua-blue-lightest rounded-lg h-auto">
							<h3 className="h3 font-bold">
								{t(`ubytovani:contactAndCommunication.linksTitle`)}
							</h3>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.link1.text`),
								}}
							></p>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.link2.text`),
								}}
							></p>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html: t(`ubytovani:contactAndCommunication.link3.text`),
								}}
							></p>
							<p
								className={"pt-4"}
								dangerouslySetInnerHTML={{
									__html:
										t(`ubytovani:contactAndCommunication.link4.text1`) +
										t(`ubytovani:contactAndCommunication.link4.text2`),
								}}
							></p>
						</div>
					</div>

					<div>
						<Tip
							tipNumber={1}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={
								"https://mkc.cz/cz/e-knihovna/metodika-jak-pomahat-a-porozumet"
							}
						/>
						<Tip
							tipNumber={2}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={
								"https://www.upol.cz/fileadmin/userdata/UP/AKTUALITY_2022/PRIRUCKA_PRO_HOSTITELE_UPRCHLIKU.pdf"
							}
						/>
						<Tip
							tipNumber={3}
							buttonText={t(`ubytovani:contactAndCommunication.button.visit`)}
							buttonLink={"https://www.movapp.cz/"}
						/>
						<Tip
							tipNumber={4}
							buttonText={t(`ubytovani:contactAndCommunication.button.read`)}
							buttonLink={
								"https://www.opu.cz/wp-content/uploads/2022/03/Jak_mluvit_navod_0304C.pdf"
							}
						/>
						<Tip
							tipNumber={5}
							buttonText={t(
								`ubytovani:contactAndCommunication.button.moreInfo`
							)}
							buttonLink={
								"https://www.opu.cz/wp-content/uploads/2022/03/Jak_mluvit_navod_0304C.pdf"
							}
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
				<h3 className={"h3 font-bold"}>
					{t(`ubytovani:contactAndCommunication.tip${tipNumber}.title`)}
				</h3>
				<p className={"py-2"}>
					{t(`ubytovani:contactAndCommunication.tip${tipNumber}.text`)}
				</p>

				<Link href={buttonLink}>
					<a
						className="block text-ua-blue text-[18px] font-bold border-2 border-ua-blue rounded-md w-full text-center
					 hover:bg-ua-blue-dark hover:text-white transition duration-150 p-1.5"
					>
						{buttonText}
					</a>
				</Link>
			</div>
		</div>
	);
};
