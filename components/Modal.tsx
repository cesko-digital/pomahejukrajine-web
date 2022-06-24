import { PropsWithChildren } from "react";
import CloseIcon from "./CloseIcon";

export const Modal = ({
	children,
	maxWidth,
	onClose,
}: PropsWithChildren<{ maxWidth?: string; onClose: () => void }>) => {
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
					<div
						className={
							"relative bg-white rounded-md text-left overflow-hidden shadow-xl sm:w-full " +
							(maxWidth ?? "sm:max-w-xl")
						}
					>
						<div
							onClick={onClose}
							className="absolute right-6 top-6 w-9 h-9 bg-gray-400 rounded-full cursor-pointer flex justify-center items-center"
						>
							<CloseIcon fillColor="#ffffff" />
						</div>
						<div className="bg-gray-50 px-4 sm:px-6 pt-6">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
