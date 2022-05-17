import type { NextPage, GetStaticProps } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import { HelpForm } from "../components/HelpForm";
import Footer from "../components/footer";
import { publicQuery, PublicQueryResult } from "../lib/shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Page: NextPage<PublicQueryResult> = ({
	offerTypes,
	districts,
	languages,
}) => {
	const { t } = useTranslation();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								Шукаю допомоги
							</h2>
						</div>
						<div
							className={`mt-12 ${
								process.env.NEXT_TEMPORARY == "TEMPORARY" ? "hidden" : ""
							}`}
						>
							<HelpForm
								offerTypes={offerTypes}
								uk={true}
								districts={districts}
								languages={languages}
							/>
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN}`,
		},
		body: JSON.stringify({
			query: `{ ${publicQuery} }`,
		}),
	});

	const json = await response.json();
	const { data } = json;

	return {
		props: {
			...data,
			...(await serverSideTranslations(locale as string, ["common"])),
		},
		revalidate: 60,
	};
};

export default Page;
