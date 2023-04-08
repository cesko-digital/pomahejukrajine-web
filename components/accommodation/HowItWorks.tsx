import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const HowItWorks = () => {
	const { t } = useTranslation("ubytovani");

	return (
		<section id="howItWorks" className="text-center pt-20 md:pt-28">
			<div className="max-w-7xl mx-auto bg-gradient">
				<h2 className="text-2xl inline-flex font-bold lg:text-3xl mb-4">
					{t("ubytovani:howItWorks.title")}
				</h2>
				<p>{t("ubytovani:howItWorks.text")}</p>
			</div>

			<ZigZagGrid />

			<div className="flex justify-center mb-[91px]">
				<Link href="#offerAccommodation">
					<a className="text-white text-[18px] bg-ua-blue font-bold rounded-md w-[225px] py-4 mt-9 flex justify-center items-center hover:bg-ua-blue-dark transition duration-150">
						{t("ubytovani:box.button1")}
					</a>
				</Link>
			</div>
		</section>
	);
};

const ZigZagGrid = () => {
	return (
		<div id="zigZagGrid" className="container mx-auto p-4">
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
	const order =
		zigZag === "zig"
			? {
					space: "order-1 md:order-1",
					icon: "order-2 md:order-3",
					stepHeader: "order-3 md:order-2",
					stepText: "order-4 md:order-4",
			  }
			: {
					space: "order-1 md:order-2",
					icon: "order-2 md:order-4",
					stepHeader: "order-3 md:order-1",
					stepText: "order-4 md:order-3",
			  };

	return (
		<div
			key={stepNumber}
			className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full"
		>
			<div className={`${order.space} h-full w-full`}>
				<Space stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${order.icon} h-full w-full`}>
				<Icon stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${order.stepHeader} h-full w-full`}>
				<StepHeader stepNumber={stepNumber} zigZag={zigZag} />
			</div>
			<div className={`${order.stepText} h-full w-full`}>
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
		<div
			className={`text-center ${alignment} border-gray-300 md:border-4 h-full`}
		>
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
		<div className="border-gray-300 md:border-4 md:text-left">
			<div className="container mx-auto p-4">
				<div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-4 md:space-y-0 md:space-x-4">
					<div className="">
						<span className="bg-ua-yellow inline-flex px-1 whitespace-nowrap">
							{`${stepNumber}. ${t("ubytovani:step")}`}
						</span>
					</div>
					<div className="md:flex-grow">
						<p className="text-[19px] font-bold mt-3 mb-7">
							{t(`ubytovani:step${stepNumber}.title`)}
						</p>
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
		<div className="border-gray-300 md:border-4 md:text-left h-full">
			<p
				className="leading-6"
				dangerouslySetInnerHTML={{
					__html: t(`ubytovani:step${stepNumber}.text`),
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
	return <span>space</span>;
};
