declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_CONTEMBER_CONTENT_URL: string;
			NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN: string;
			NODE_ENV: "development" | "production";
			PORT?: string;
			PWD: string;
			NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY: string;
			NEXT_PUBLIC_TYPESENSE_PORT: string;
			NEXT_PUBLIC_TYPESENSE_HOST: string;
			NEXT_PUBLIC_TYPESENSE_PROTOCOL: string;
		}
	}
}
