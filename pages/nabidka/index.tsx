import type { NextPage, GetStaticProps, GetServerSidePropsContext } from "next";
import { Meta } from "../../components/Meta";
import Header from "../../components/header";
import { RegisterForm } from "../../components/RegisterForm";
import Footer from "../../components/footer";
import { publicQuery, PublicQueryResult } from "../../lib/shared";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CZECH } from "../../utils/constants";

interface HomeProps extends PublicQueryResult {
	token: string;
}

const Home: NextPage<HomeProps> = ({
	offerTypes,
	districts,
	languages,
	token,
}) => {
	const { t } = useTranslation();
	const { locale } = useRouter();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{t("nabidka.title")}
							</h2>
						</div>
						<div
							className={`mt-12 ${
								process.env.NEXT_TEMPORARY == "TEMPORARY" ? "hidden" : ""
							}`}
						>
							<RegisterForm
								offerTypes={offerTypes}
								districts={districts}
								languages={languages}
								uk={locale !== CZECH}
							/>
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
			token: context.req.cookies.token || "",
			...(await serverSideTranslations(context.locale as string, ["common"])),
		},
	};
}
