import { PropsWithChildren } from "react";

export const Modal = ({
	children,
	title,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div
			className="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
					<div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl sm:max-w-lg sm:w-full">
						<div className="bg-gray-50 px-4 sm:px-6 pt-6">
							<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{title}
							</h2>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
