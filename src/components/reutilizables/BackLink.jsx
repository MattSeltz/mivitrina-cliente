import { Link } from "react-router-dom";

//ICONS
import { Back } from "../../icons/Back";

export const BackLink = () => {
	return (
		<Link
			to={"/"}
			className="rounded-full shadow-sm shadow-black h-10 w-10 absolute flex justify-center items-center"
		>
			<Back />
		</Link>
	);
};
