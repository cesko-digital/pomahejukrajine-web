const CloseIcon = ({
	fillColor = "#005BBB",
	width = 28,
	height = 28,
}: {
	fillColor?: string;
	width?: number;
	height?: number;
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 28 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			width="34.3171"
			height="5.27956"
			rx="1"
			transform="matrix(-0.707075 0.707138 -0.707075 -0.707138 27.998 3.73438)"
			fill={fillColor}
		/>
		<rect
			width="34.3171"
			height="5.27956"
			rx="1"
			transform="matrix(-0.707075 -0.707138 0.707075 -0.707138 24.2695 28)"
			fill={fillColor}
		/>
	</svg>
);
export default CloseIcon;
