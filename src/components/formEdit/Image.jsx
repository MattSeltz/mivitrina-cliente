//ICONS
import { Edit } from "../../icons/Edit";

export const Image = ({ image, evt }) => {
	return (
		<li className="relative">
			<img
				src={image.uri ? image.uri : URL.createObjectURL(image)}
				alt="imagen"
			/>
			<label
				htmlFor={`imagenes-${image.id}`}
				className="h-10 w-10 rounded-full bg-blue-500 absolute top-1 right-1 flex justify-center items-center cursor-pointer"
			>
				<Edit />
			</label>
			<input
				className="hidden"
				type="file"
				name="imagenes"
				id={`imagenes-${image.id}`}
				accept=".jpg, .jpeg, .png"
				onChange={evt}
			/>
		</li>
	);
};
