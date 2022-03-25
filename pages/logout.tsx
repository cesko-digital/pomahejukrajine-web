import type { GetServerSidePropsContext, NextPage } from "next";
import Cookies from "cookies";

const Logout: NextPage = () => {
	return null;
};

export default Logout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = new Cookies(context.req, context.res);
	cookies.set("token");

	return {
		redirect: {
			permanent: false,
			destination: "/login",
		},
	};
}
