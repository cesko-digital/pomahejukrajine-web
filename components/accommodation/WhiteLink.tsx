import Link from "next/link";

export const WhiteLink = ({
	type = "inline",
	link,
	text,
}: {
	type?: "button" | "inline";
	link: string;
	text: string;
}) => {
	const classNames =
		type === "button" ? "mt-8 mx-auto p-3 inline-block" : "p-1 w-full block";

	return (
		<Link href={link}>
			<a
				className={`text-ua-blue font-bold border-2 border-ua-blue rounded-md text-center
	hover:bg-ua-blue-dark hover:text-white transition duration-150 ${classNames}`}
			>
				{text}
			</a>
		</Link>
	);
};
