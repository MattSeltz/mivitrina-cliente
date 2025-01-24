import { Link } from "react-router-dom";

//ICONS
import { Edit } from "../../icons/Edit";
import { SignOut } from "../../icons/SignOut";
import { Cross } from "../../icons/Cross";
import { Hamburguer } from "../../icons/Hamburguer";

export const Header = ({ user, handleClick, setIsNotOpen, isNotOpen }) => {
	return (
		<header className="flex justify-between items-center shadow-sm shadow-black p-10 relative">
			<h1 className="text-center text-xl font-bold tracking-widest">
				{user?.name}
			</h1>

			<div className="gap-5 hidden md:flex">
				<Link
					to={"/edit"}
					className="flex justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
				>
					<Edit /> EDITAR
				</Link>
				<button
					onClick={handleClick}
					type="button"
					className="flex justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
				>
					<SignOut /> CERRAR SESIÓN
				</button>
			</div>

			<button
				onClick={() => setIsNotOpen(false)}
				type="button"
				className="rounded-full flex justify-center items-center shadow-sm shadow-black h-10 w-10 md:hidden"
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
								to="/edit"
								className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
							>
								<Edit /> EDITAR
							</Link>
						</li>
						<li>
							<button
								onClick={handleClick}
								type="button"
								className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
							>
								<SignOut /> CERRAR SESIÓN
							</button>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
};
