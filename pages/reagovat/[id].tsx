import type { NextPage, GetServerSideProps } from "next";
import { Meta } from "../../components/Meta";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { CreateReactionForm } from "../../components/CreateReactionForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Reagovat: NextPage<any> = ({ offerId }) => {
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
								{t("reagovat.title")}
							</h2>
						</div>
						<div className={`mt-12`}>
							<CreateReactionForm offerId={offerId} />
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			offerId: ctx.query.id,
			...(await serverSideTranslations(ctx.locale as string, ["common"])),
		},
	};
};

export default Reagovat;
