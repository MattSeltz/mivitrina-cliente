import { Link } from "react-router-dom";

//ICONS
import { Edit } from "../../icons/Edit";
import { Cross } from "../../icons/Cross";
import { Hamburguer } from "../../icons/Hamburguer";

export const Header = ({ isNotOpen, setIsNotOpen, slug }) => {
	return (
		<>
			<div className="gap-5 hidden absolute right-10 md:flex">
				<Link
					to={`/vitrina/${slug}/edit`}
					className="hidden justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600 md:flex"
				>
					<Edit /> EDITAR
				</Link>
				<Link
					to="/profile"
					className="hidden justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600 md:flex"
				>
					VOLVER
				</Link>
			</div>

			<button
				onClick={() => setIsNotOpen(false)}
				type="button"
				className="rounded-full flex justify-center items-center absolute right-10 shadow-sm shadow-black  h-10 w-10 md:hidden"
			>
				{isNotOpen ? <Hamburguer /> : <Cross />}
			</button>

			{!isNotOpen && (
				<nav className="absolute right-10 top-10 md:hidden">
					<ul className="flex flex-col gap-3">
						<button
							onClick={() => setIsNotOpen(true)}
							type="button"
							className="h-10 w-10 ml-auto flex justify-center items-center"
						>
							<Cross />
						</button>
						<li>
							<Link
								to={`/vitrina/${slug}/edit`}
								className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
							>
								<Edit /> EDITAR
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
							>
								VOLVER
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};
