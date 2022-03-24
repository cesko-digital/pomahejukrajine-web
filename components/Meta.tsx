import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

type IMetaProps = {
	title: string;
	description: string;
	canonical?: string;
	noIndex?: boolean;
};

const Meta = (props: IMetaProps) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<meta charSet="UTF-8" key="charset" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
					key="viewport"
				/>
				<link
					rel="apple-touch-icon"
					href={`/apple-touch-icon.png`}
					key="apple"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href={`/favicon-32x32.png`}
					key="icon32"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href={`/favicon-16x16.png`}
					key="icon16"
				/>
			</Head>
			<Script
				strategy="afterInteractive"
				data-domain="pomahejukrajine.cz"
				src="https://plausible.io/js/plausible.js"
			/>
			<NextSeo
				title={props.title}
				description={props.description}
				canonical={props.canonical}
				noindex={props.noIndex}
				nofollow={props.noIndex}
				openGraph={{
					title: props.title,
					description: props.description,
					url: props.canonical,
					locale: "cs",
					site_name: "Pomáhej Ukrajině",
					images: [
						{
							url: "https://www.pomahejukrajine.cz/og_image_1200x630-v3.png",
							width: 1200,
							height: 630,
							alt: "Pomáhej Ukrajině",
						},
					],
				}}
			/>
		</>
	);
};

export { Meta };
