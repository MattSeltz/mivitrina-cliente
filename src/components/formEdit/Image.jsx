export const Image = ({ image, evt }) => {
	return (
		<li className="relative">
			<img
				src={image.uri ? image.uri : URL.createObjectURL(image)}
				alt="imagen"
			/>
			<button
				type="button"
				className="h-5 w-5 rounded-full bg-red-500 absolute top-1 right-1 text-xs"
				onClick={evt}
			>
				X
			</button>
		</li>
	);
};
