import type { GetServerSideProps, NextPage } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { VerifyReactionForm } from "../components/VerifyReactionForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const VerifyReaction: NextPage = ({}) => {
	const { t } = useTranslation();

	return (
		<div className="antialiased text-gray-600">
			<Meta
				title={t("meta.title")}
				description={t("meta.description")}
				noIndex
			/>
			<Header />
			<div className="bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-8">
				<div className="relative max-w-xl mx-auto">
					<main className="mt-2">
						<div className="text-center">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{t("verifyReaction.title")}
							</h2>
							<p className="mt-4 text-lg leading-6 text-gray-500">
								{t("verifyReaction.text")}
							</p>
							{/*<p className="mt-4 text-lg leading-6 text-gray-500">*/}
							{/*	*/}
							{/*</p>*/}
						</div>
						<div className="mt-12">
							<VerifyReactionForm />
						</div>
					</main>
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

export default VerifyReaction;
