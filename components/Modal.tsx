import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import BackIcon from "./BackIcon";
import ModalCloseIcon from "./ModalCloseIcon";

export const Modal = ({
	children,
	maxWidth,
	onClose,
}: PropsWithChildren<{ maxWidth?: string; onClose: () => void }>) => {
	const { t } = useTranslation();

	return (
		<div
			className="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex flex-col items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
					<div className="bg-grey-ligth2 rounded-md">
						<div className="flex justify-between px-6 pt-6">
							<div className="text-sm text-ua-blue flex justify-center items-start">
								<button
									className="flex items-center cursor-pointer"
									onClick={onClose}
								>
									<BackIcon />
									<span className="pl-1 underline mt-[-1px]">
										{t("reagovat.backToOffers")}
									</span>
								</button>
							</div>
							<button
								onClick={onClose}
								className="rounded-full cursor-pointer hover:opacity-70"
							>
								<ModalCloseIcon />
							</button>
						</div>
						<div className="text-left overflow-hidden shadow-xl sm:w-full sm:max-w-xl pb-4">
							<div className="px-4 sm:px-6 pt-3">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
