import type { NextPage, GetServerSideProps } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { CZECH } from "../utils/constants";
import { useRouter } from "next/router";

const Home: NextPage<{ faqItems: FAQResponse[] }> = ({ faqItems }) => {
	const { t } = useTranslation();
	const { locale } = useRouter();
	const isUKLanguage = locale !== CZECH;

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
							{faqItems.map(
								({ order, question, questionUA, answer, answerUA }) => (
									<div key={order}>
										<dt className="text-lg font-bold text-gray-900 leading-6">
											{isUKLanguage ? questionUA : question}
										</dt>
										<dd
											className="mt-2 text-base text-gray-700"
											dangerouslySetInnerHTML={{
												__html: isUKLanguage ? answerUA : answer,
											}}
										/>
									</div>
								)
							)}
						</dl>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

type FAQResponse = {
	order: number;
	question: string;
	questionUA: string;
	answer: string;
	answerUA: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale } = context;

	return {
		props: {
			faqItems: await getFaqItems(),
			...(await serverSideTranslations(locale as string, ["common"])),
		},
	};
};

const getFaqItems = async (): Promise<FAQResponse[]> => {
	const token = process.env.NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN;
	const response = await fetch(process.env.NEXT_PUBLIC_CONTEMBER_CONTENT_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: `query {
				listFrequentlyAskedQuestion
					{
						order
						question
						questionUA
						answer
						answerUA
					}
				}`,
		}),
	});

	const faqItemsRaw = await response?.json();
	const faqItemsRawList = faqItemsRaw?.data?.listFrequentlyAskedQuestion;
	if (!faqItemsRawList) return [];

	return faqItemsRawList.sort(
		(a: { order: number }, b: { order: number }) => a.order - b.order
	);
};

export default Home;
