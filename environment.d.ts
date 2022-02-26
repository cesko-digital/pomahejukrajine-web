declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_CONTEMBER_CONTENT_URL: string;
			NEXT_PUBLIC_CONTEMBER_PUBLIC_TOKEN: string;
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
		}
	}
}
