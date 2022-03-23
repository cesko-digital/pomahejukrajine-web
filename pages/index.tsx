import type { NextPage } from "next";
import { Meta } from "../components/Meta";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";

const Logos = [
	{ href: "https://www.opu.cz/cs/", path: "/logos/opu.jpg" },
	{ href: "https://adra.cz", path: "/logos/adra.jpg" },
	{ href: "https://mostpro.cz/", path: "/logos/mostpro.jpg" },
	{ href: "https://www.charita.cz/", path: "/logos/charita.jpg" },
	{ href: "https://mkc.cz/", path: "/logos/multikulturnicentrumpraha.jpg" },
	{
		href: "https://www.migrace.com/",
		path: "/logos/sdruzeniprointegraciamigraci.jpg",
	},
	{ href: "https://inbaze.cz/", path: "/logos/inbaze.jpg" },
	{ href: "https://meta-ops.eu/", path: "/logos/meta.jpg" },
	{ href: "https://www.amnesty.cz/", path: "/logos/amnestyinternational.jpg" },
	{ href: "https://www.facebook.com/spolek.Amiga", path: "/logos/amiga.jpg" },
	{ href: "https://nesehnuti.cz/", path: "/logos/nesehnuti.jpg" },
	{ href: "https://www.diakonie.cz/", path: "/logos/diakonie.jpg" },
	{ href: "https://www.strada.cz/", path: "/logos/lastrada.jpg" },
	{ href: "https://www.clovekvtisni.cz/", path: "/logos/clovekvtisni.jpg" },
	{ href: "https://plnu.cz/", path: "/logos/pomahamelidemnauteku.jpg" },
	{
		href: "https://www.facebook.com/atlasoftodaysworld",
		path: "/logos/atlasmigrace.jpg",
	},
] as const;

const Home: NextPage = () => {
	return (
		<div className="antialiased text-gray-600">
			<Meta
				title="Pomáhej Ukrajině"
				description="Neziskové organizace pracující s migranty v ČR se spojily a toto je centrální místo, kde můžete nabídnout svou pomoc. Některé nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc potřebují. Ostatní nabídky budou zpracovány kolegy z místních neziskových organizací nebo obcí."
			/>
			<Header />
			<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div className="text-center">
					<div className="max-w-xl mx-auto">
						<svg
							id="Layer_1"
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 372 117.31"
						>
							<defs>
								<style>{".cls-1{fill:#005bbb}"}</style>
							</defs>
							<path
								className="cls-1"
								d="M92.82 66.53V46.11h7.33c3.39 0 5.23.51 6.56 1.53A6.08 6.08 0 0 1 109 52.7a6.34 6.34 0 0 1-2.12 5c-1.41 1.21-3.36 1.78-6.75 1.78H97v7.07ZM97 49.85v5.85h3.31a6.55 6.55 0 0 0 3.45-.62 2.57 2.57 0 0 0 1.13-2.35 2.36 2.36 0 0 0-1-2.12 6 6 0 0 0-3.62-.76ZM118.75 66.87c-4.86 0-8.11-3.4-8.11-8.43s3.25-8.44 8.11-8.44 8.15 3.39 8.15 8.45-3.28 8.42-8.15 8.42Zm0-3.42c2.46 0 4.19-2 4.19-5s-1.73-5-4.19-5-4.18 2-4.18 5 1.72 5 4.18 5ZM129.54 66.53v-16.2h3.85v2.29a5.58 5.58 0 0 1 4.75-2.62 5.22 5.22 0 0 1 4.86 3.13 6.6 6.6 0 0 1 5.65-3.13c3.11 0 5.29 2.2 5.29 6v10.53h-3.84v-9.67c0-2.26-1-3.45-2.77-3.45-2.41 0-3.74 2.15-3.74 6.11v7h-3.84v-9.66c0-2.35-1.05-3.45-2.69-3.45-2.32 0-3.67 2.23-3.67 6.08v7ZM171.24 66.53h-3.81a11.09 11.09 0 0 1-.26-2.12 6.29 6.29 0 0 1-5.2 2.46c-3.28 0-5.51-1.9-5.51-4.84s2.2-4.78 6.75-5.48l4-.62v-.26c0-1.47-1.13-2.26-3-2.26-2.12 0-3.51 1-4 2.85L157 54c1.3-2.68 3.76-4 7.24-4 4.24 0 6.61 2 6.61 5.54v7.61a15.07 15.07 0 0 0 .39 3.38Zm-8.48-2.91a4.19 4.19 0 0 0 4.41-4.36v-.2l-2.77.46c-3 .48-4 1.1-4 2.34s.89 1.76 2.36 1.76ZM162.22 49l2.29-4.42h4.24L165.5 49ZM174.39 66.53v-21h3.84v7.18a6.76 6.76 0 0 1 5.6-2.74c3.73 0 5.91 2.48 5.91 6.36v10.2h-3.87v-9.45c0-2.4-1.25-3.64-3.2-3.64-2.68 0-4.44 2.4-4.44 6.05v7ZM200.41 66.87c-4.89 0-8.2-3.4-8.2-8.43S195.38 50 200.3 50c5.17 0 8.25 3.73 7.74 9.55h-11.79a4 4 0 0 0 4.22 4 3.64 3.64 0 0 0 3.76-2.88l3.39 1.52a7.33 7.33 0 0 1-7.21 4.68Zm-4-10.46h7.66a3.59 3.59 0 0 0-3.79-3.11 3.65 3.65 0 0 0-3.88 3.11ZM208.66 73.65l-1-3.45c2.14-.11 2.88-.93 2.88-2.88v-17h3.84v17.23c-.04 3.5-2.38 5.74-5.72 6.1Zm1.84-25.13v-3.74h3.87v3.74ZM227.66 64.58a8.63 8.63 0 0 1-2.37-6.48v-12h4.15v12a5.94 5.94 0 0 0 .65 2.91 4.76 4.76 0 0 0 7.81 0 5.94 5.94 0 0 0 .65-2.91v-12h4.15v12a8.52 8.52 0 0 1-2.37 6.48 9.91 9.91 0 0 1-12.67 0ZM246.29 66.53v-21h3.85v11.81l6.36-7h4.5l-5.48 6.13 6.64 10.07h-4.76l-4.49-7.18-2.77 3.11v4.07ZM263.89 50.33h3.85v2.4a5.37 5.37 0 0 1 4.47-2.73 4.11 4.11 0 0 1 3.36 1.52l-1.72 3.28a2.66 2.66 0 0 0-2.29-1.13c-2 0-3.82 1.73-3.82 6.48v6.39h-3.85ZM290.93 66.53h-3.82a10.47 10.47 0 0 1-.25-2.12 6.32 6.32 0 0 1-5.21 2.46c-3.28 0-5.51-1.9-5.51-4.84s2.21-4.78 6.76-5.48l4-.62v-.26c0-1.47-1.13-2.26-3.06-2.26-2.12 0-3.5 1-3.95 2.85L276.71 54c1.3-2.68 3.76-4 7.24-4 4.24 0 6.61 2 6.61 5.54v7.61a14.52 14.52 0 0 0 .37 3.38Zm-8.48-2.91a4.2 4.2 0 0 0 4.41-4.36v-.2l-2.77.46c-3 .48-4 1.1-4 2.34s.91 1.76 2.36 1.76ZM292.23 73.65l-1-3.45c2.14-.11 2.88-.93 2.88-2.88v-17h3.84v17.23c-.04 3.5-2.38 5.74-5.72 6.1Zm1.84-25.13v-3.74h3.87v3.74ZM301.28 48.52v-3.74h3.87v3.74Zm0 18V50.33h3.84v16.2ZM308.55 66.53v-16.2h3.85v2.26A7 7 0 0 1 318 50c3.73 0 5.91 2.48 5.91 6.36v10.17H320v-9.45c0-2.32-1.16-3.64-3.19-3.64-2.69 0-4.44 2.4-4.44 6.05v7ZM334.71 66.87c-4.9 0-8.2-3.4-8.2-8.43s3.16-8.44 8.08-8.44c5.18 0 8.26 3.73 7.75 9.55h-11.79a4 4 0 0 0 4.21 4 3.63 3.63 0 0 0 3.76-2.88l3.4 1.52a7.34 7.34 0 0 1-7.21 4.68ZM333.09 49l-4.49-4.42h3.82l2.09 1.87 2.06-1.87h3.82l-4.5 4.42Zm-2.4 7.38h7.66a3.58 3.58 0 0 0-3.79-3.11 3.65 3.65 0 0 0-3.87 3.14ZM77.11 38.31a14.66 14.66 0 0 0-2.31-1.91 14.13 14.13 0 0 0-2.71-1.4 13.46 13.46 0 0 0-4.75-.85 13.6 13.6 0 0 0-4.53.75c-.43.16-.85.33-1.24.52a12.29 12.29 0 0 0-2.52 1.63 14.3 14.3 0 0 0-3.95 5.22 14 14 0 0 0-4.34-5.55 12.72 12.72 0 0 0-7.89-2.57 13.72 13.72 0 0 0-10.77 5.27 16.9 16.9 0 0 0-1.67 2.46 18.3 18.3 0 0 0-1.22 2.67 16.46 16.46 0 0 0-1 5.52c0 13.28 17.54 23.58 24.3 28.55a4.34 4.34 0 0 0 4.91.19l.3-.19c2.53-1.86 6.58-4.47 10.66-7.71 1-.81 2-1.66 3-2.55l1-.89c.65-.61 1.29-1.24 1.91-1.87.94-1 1.82-2 2.64-3 3-3.77 5.06-8 5.06-12.54a17.32 17.32 0 0 0-4.88-11.75Z"
							/>
							<path
								d="M32.09 55.54c3.29 7.84 12.81 14.46 19 18.74 1.17.81 2.18 1.52 3.05 2.16a1.67 1.67 0 0 0 1 .33 1.62 1.62 0 0 0 1-.33c.88-.64 1.89-1.35 3-2.16 6.15-4.27 15.68-10.9 19-18.74Z"
								style={{
									fill: "#ffd500",
								}}
							/>
						</svg>
					</div>
					<p className="max-w-xl mt-2 mx-auto text-xl text-gray-500">
						Toto je centrální místo, kde můžete nabídnout svou pomoc. Některé
						nabídky budou přímo zveřejněny a mohou na ně reagovat ti, kdo pomoc
						potřebují. Ostatní nabídky budou zpracovány kolegyněmi a kolegy z
						místních neziskových organizací nebo obcí. Pro využití těchto
						nabídek se tedy obracejte na pomáhající organizace nebo regionální
						koordinační centra pomoci.
					</p>
					<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
						Jste organizace a potřebujete přístup k datům?{" "}
						<a
							className="underline underline-offset-2 hover:no-underline"
							target="_blank"
							rel="noreferrer"
							href="https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
						>
							Vyplňte prosím formulář a domluvíme se
						</a>
						.
					</p>
					<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
						Pokud nás potřebujete kontaktovat, napište na{" "}
						<a
							className="underline underline-offset-2 hover:no-underline"
							href="mailto:pomahejukrajine@migracnikonsorcium.cz?subject=PomáhejUkrajině"
						>
							pomahejukrajine@migracnikonsorcium.cz
						</a>
						.
					</p>
					<div
						className={`mt-10 space-x-4 ${
							process.env.NEXT_TEMPORARY == "TEMPORARY" ? "hidden" : ""
						}`}
					>
						<Link href="/nabidka">
							<a className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
								Nabídnout pomoc
							</a>
						</Link>
						<Link href="/nabidky">
							<a className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-100">
								Nabídky pomoci
							</a>
						</Link>
					</div>
				</div>
				<p className="mt-24 text-center text-base text-gray-400">
					Tento projekt provozuje Konsorcium nevládních organizací pracujících s
					migranty v ČR. Členy jsou:
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
					{Logos.map((logo) => (
						<Link key={logo.path} href={logo.href}>
							<a>
								<Image
									src={logo.path}
									width={360}
									height={199}
									alt={logo.href}
								/>
							</a>
						</Link>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
