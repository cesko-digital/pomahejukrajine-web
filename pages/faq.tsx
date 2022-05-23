import type { NextPage, GetServerSideProps } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const NUMBER_OF_FAQS = 16;

const Home: NextPage = () => {
	const { t } = useTranslation();

	return (
		<div className="antialiased text-gray-600">
			<Meta title={t("meta.title")} description={t("meta.description")} />
			<Header />
			<div className="bg-white">
				<div className="max-w-3xl px-4 py-16 mx-auto sm:px-6 lg:py-20 lg:px-8">
					<div>
						<h1 className="text-4xl font-extrabold text-center text-gray-900">
							{t("faq.frequentlyAskedQuestions")}
						</h1>
					</div>
					<div className="mt-12">
						<dl className="space-y-12">
							{Array(NUMBER_OF_FAQS)
								.fill(0)
								.map((_, index) => (
									<div key={index}>
										<dt className="text-lg font-bold text-gray-900 leading-6">
											{t(`faq.questions.question${index}`)}
										</dt>
										<dd
											className="mt-2 text-base text-gray-700"
											dangerouslySetInnerHTML={{
												__html: t(`faq.questions.answer${index}`),
											}}
										></dd>
									</div>
								))}
						</dl>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ["common"])),
		},
	};
};

export default Home;
