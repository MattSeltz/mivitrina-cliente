import { Link } from "react-router-dom";

export const ProfilePage = () => {
	return (
		<>
			<header className="flex justify-between items-center shadow-sm shadow-black p-10">
				<h1 className="text-center text-xl font-bold tracking-widest">
					JOHN DOE
				</h1>

				<div className="flex gap-5">
					<Link
						to={"/edit"}
						className="hidden justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600 md:flex"
					>
						EDITAR
					</Link>
					<Link
						to="/"
						className="hidden justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600 md:flex"
					>
						CERRAR SESIÓN
					</Link>
				</div>
				<Link
					to="/"
					className="shadow-sm flex justify-center items-center shadow-black font-bold rounded-full h-10 w-10 md:hidden"
				>
					X
				</Link>
			</header>
			<main className="flex flex-col gap-10 p-10">
				<p className="text-center text-xl font-bold tracking-wide">
					MIS SITIOS
				</p>

				<ul className="flex flex-col gap-3 items-center max-w-md mx-auto w-full">
					<li className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600">
						<Link to={"/vitrina"}>TANTE SARA</Link>
					</li>
				</ul>
			</main>
		</>
	);
};
