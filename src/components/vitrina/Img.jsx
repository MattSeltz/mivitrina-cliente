export const Img = ({ item, site }) => {
	return (
		<li>
			<img
				src={item.uri}
				alt={site?.title}
				className="rounded-md shadow-sm shadow-black h-52 w-52 object-cover"
			/>
		</li>
	);
};
