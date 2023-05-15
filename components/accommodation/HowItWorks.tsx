import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { BlueGradient } from "./Gradient";

export const HowItWorks = () => {
	const { t } = useTranslation("ubytovani");

	return (
		<section id="howItWorks" className="py-8 relative">
			<BlueGradient />

			<div className="md:container md:mx-auto">
				<div className="max-w-7xl mx-auto text-center py-8">
					<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
						{t("ubytovani:howItWorks.title")}
					</h2>
					<p>{t("ubytovani:howItWorks.text")}</p>
				</div>

				<ZigZagGrid />

				<div className="flex justify-center mb-[45px] md:mb-[91px]">
					<Link href="#offerAccommodation">
						<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-[225px] py-4 mt-4 md:mt-9 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
							{t("ubytovani:helpFindAccommodation.button1")}
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
};

const ZigZagGrid = () => {
	return (
		<div id="zigZagGrid" className="p-4">
			<ZigZagItem stepNumber={1} zigZag="zag" />
			<ZigZagItem stepNumber={2} zigZag="zig" />
			<ZigZagItem stepNumber={3} zigZag="zag" />
			<ZigZagItem stepNumber={4} zigZag="zig" />
			<ZigZagItem stepNumber={5} zigZag="zag" />
		</div>
	);
};

const ZigZagItem = ({
	stepNumber,
	zigZag,
}: {
	stepNumber: number;
	zigZag: "zig" | "zag";
}) => {
	const classNames =
		zigZag === "zig"
			? {
					space: "order-1 md:order-1 md:border-r-2",
					icon: "order-2 md:order-3 md:border-r-2",
					stepHeader: "order-3 md:order-2 md:border-l-2 md:border-b-2",
					stepText: "order-4 md:order-4 md:border-l-2 md:border-t-2",
			  }
			: {
					space: "order-1 md:order-2 md:border-l-2",
					icon: "order-2 md:order-4 md:border-l-2 ",
					stepHeader: "order-3 md:order-1 md:border-r-2 md:border-b-2",
					stepText: "order-4 md:order-3 md:border-r-2 md:border-t-2",
			  };

	const common = "border-ua-blue";

	return (
		<div
			key={stepNumber}
			className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full"
		>
			<div className={`${classNames.space} ${common} h-full w-full`}>
				<Space stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${classNames.icon} ${common} h-full w-full px-4`}>
				<Icon stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${classNames.stepHeader} ${common} h-full w-full`}>
				<StepHeader stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${classNames.stepText} ${common} h-full w-full p-4`}>
				<StepText stepNumber={stepNumber} zigZag={zigZag} />
			</div>
		</div>
	);
};

const Icon = ({
	stepNumber,
	zigZag,
}: {
	stepNumber: number;
	zigZag: "zig" | "zag";
}) => {
	const { t } = useTranslation("ubytovani");
	const alignment = zigZag === "zig" ? "md:text-right" : "md:text-left";

	return (
		<div className={`text-center ${alignment} h-full`}>
			<Image
				width={144}
				height={131}
				src={`/ubytovani/krok-${stepNumber}.svg`}
				alt={`${t(`ubytovani:stepNumber`)} ${stepNumber}`}
			/>
		</div>
	);
};

const StepHeader = ({
	stepNumber,
	zigZag,
}: {
	stepNumber: number;
	zigZag: "zig" | "zag";
}) => {
	const { t } = useTranslation("ubytovani");

	return (
		<div className="text-center md:text-left">
			<div className="p-4 md:mt-10 mr-16">
				<div className="md:flex text-[19px]">
					<div className="">
						<span className="bg-ua-yellow inline-flex px-1 whitespace-nowrap mr-2">
							{t(`ubytovani:howItWorks.step${stepNumber}.number`)}
						</span>
					</div>
					<div className="mt-4 md:mt-0 md:flex-grow">
						<span className=" font-bold mt-3 mb-7">
							{t(`ubytovani:howItWorks.step${stepNumber}.title`)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const StepText = ({
	stepNumber,
	zigZag,
}: {
	stepNumber: number;
	zigZag: "zig" | "zag";
}) => {
	const { t } = useTranslation("ubytovani");

	return (
		<div className="md:text-left h-full md:mb-20 w-80 md:w-auto">
			<p
				className="leading-6 text-[15px]"
				dangerouslySetInnerHTML={{
					__html: t(`ubytovani:howItWorks.step${stepNumber}.text`),
				}}
			/>
		</div>
	);
};

const Space = ({
	stepNumber,
	zigZag,
}: {
	stepNumber: number;
	zigZag: "zig" | "zag";
}) => {
	return <span></span>;
};
