import Image from "next/image";

export type AccommodationReasonProps = {
	title: string;
	text: string;
	image: string;
};

export const AccommodationReason = ({
	title,
	text,
	image,
}: AccommodationReasonProps) => {
	return (
		<div id="accommodation-reason" className="w-full md:w-1/3 md:px-9">
			<Image src={image} width={117} height={117} alt={title} />
			<h3 className="font-bold py-6">{title}</h3>
			<p
				className="leading-6"
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			/>
		</div>
	);
};
