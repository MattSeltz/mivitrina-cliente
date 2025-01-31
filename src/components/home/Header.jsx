import { Link } from "react-router-dom";

//ICONS
import { SignIn } from "../../icons/SignIn";
import { Cross } from "../../icons/Cross";
import { Hamburguer } from "../../icons/Hamburguer";

export const Header = ({ setIsNotOpen, isNotOpen }) => {
	return (
		<header className="flex justify-between items-center shadow-sm shadow-black p-10 relative">
			<h1 className="text-center text-xl font-bold tracking-widest">
				MiVitrina
			</h1>

			<div className="gap-10 hidden md:flex">
				<Link
					to="/signUp"
					className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
				>
					REGISTRARSE
				</Link>
				<Link
					to="/signIn"
					className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
				>
					<SignIn /> INICIAR SESIÓN
				</Link>
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
								to="/signUp"
								className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
							>
								REGISTRARSE
							</Link>
						</li>
						<li>
							<Link
								to="/signIn"
								className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
							>
								<SignIn /> INICIAR SESIÓN
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
};
