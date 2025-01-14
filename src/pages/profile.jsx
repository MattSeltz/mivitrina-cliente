import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOneData } from "../services/services";

export const ProfilePage = () => {
	const [isNotOpen, setIsNotOpen] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		getOneData("user", sessionStorage.getItem("id"))
			.then((res) => setUser(res[1]))
			.catch((e) => console.error(e));
	}, []);

	return (
		<>
			<header className="flex justify-between items-center shadow-sm shadow-black p-10">
				<h1 className="text-center text-xl font-bold tracking-widest">
					{user?.name}
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

				<button
					onClick={() => setIsNotOpen(false)}
					type="button"
					className="rounded-full shadow-sm shadow-black h-10 w-10 md:hidden"
				>
					{isNotOpen ? "O" : "X"}
				</button>

				{!isNotOpen && (
					<nav className="absolute right-10 top-10">
						<ul className="flex flex-col gap-3">
							<button
								onClick={() => setIsNotOpen(true)}
								type="button"
								className="h-10 w-10 ml-auto"
							>
								X
							</button>
							<li>
								<Link
									to="/edit"
									className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
								>
									EDITAR
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
								>
									CERRAR SESIÓN
								</Link>
							</li>
						</ul>
					</nav>
				)}
			</header>
			<main className="flex flex-col gap-10 p-10">
				<p className="text-center text-xl font-bold tracking-wide">
					MIS SITIOS
				</p>

				<ul className="flex flex-col gap-3 items-center max-w-md mx-auto w-full">
					{user?.sites.map((site) => (
						<li
							key={site._id}
							className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
						>
							<Link to={`/vitrina/${site._id}`}>{site.title}</Link>
						</li>
					))}
				</ul>

				<Link
					to="/add"
					className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors absolute bottom-5 right-5 hover:bg-blue-600"
				>
					AÑADIR
				</Link>
			</main>
		</>
	);
};
