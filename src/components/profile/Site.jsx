import { Link } from "react-router-dom";

export const Site = ({ site }) => {
	return (
		<li className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600">
			<Link to={`/vitrina/${site.title.toLowerCase().split(" ").join("")}`}>
				{site.title}
			</Link>
		</li>
	);
};
