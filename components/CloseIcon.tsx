const CloseIcon = ({ fillColor = "#005BBB" }: { fillColor?: string }) => (
	<svg
		width="20"
		height="22"
		viewBox="0 0 20 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			width="24.2618"
			height="3.73259"
			rx="1"
			transform="matrix(-0.686323 0.727297 -0.686322 -0.727297 19.2129 3.43164)"
			fill={fillColor}
		/>
		<rect
			width="24.2618"
			height="3.73259"
			rx="1"
			transform="matrix(-0.686323 -0.727297 0.686323 -0.727297 16.6514 21.0762)"
			fill={fillColor}
		/>
	</svg>
);
export default CloseIcon;
