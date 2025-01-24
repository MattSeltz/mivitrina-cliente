//ICONS
import { Trash } from "../../icons/Trash";

export const Site = ({ site, handleClickDeleteSite }) => {
	return (
		<li className="flex justify-between items-center">
			<p>{site.title}</p>{" "}
			<button
				onClick={() => handleClickDeleteSite(site._id)}
				className="rounded-md flex justify-center items-center gap-1 mt-3 shadow-sm shadow-black p-3 bg-red-500 transition-colors hover:bg-red-600"
				type="button"
			>
				<Trash /> ELIMINAR
			</button>
		</li>
	);
};
