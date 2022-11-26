import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	id: string;
	children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ id, children }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	const element = document.querySelector(`#${id}`);

	return mounted && element ? createPortal(children, element) : null;
};

export default Portal;
