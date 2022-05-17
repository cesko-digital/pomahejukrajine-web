import Link from "next/link";

export type OfferTypeListProps = {
	listOfferType: any;
	offerTypeId: string;
};

export const OfferTypeList = ({
	listOfferType,
	offerTypeId,
}: OfferTypeListProps) => (
	<ul className="mt-8 flex flex-wrap justify-center gap-2">
		{listOfferType.map(({ id, name }: any) => (
			<li key={id}>
				<Link
					href={{
						href: "/nabidky-new/[id]",
						query: { id },
					}}
				>
					<a
						className={`border border-gray-200 py-2 px-6 rounded-full block ${
							offerTypeId === id
								? "bg-blue-600 text-white border-blue-800 shadow-sm hover:bg-blue-600"
								: ""
						}`}
					>
						{name}
					</a>
				</Link>
			</li>
		))}
	</ul>
);
