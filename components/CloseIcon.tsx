const CloseIcon = ({
	fillColor = "#005BBB",
	width = 23,
	height = 17,
}: {
	fillColor?: string;
	width?: number;
	height?: number;
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 20 20"
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
