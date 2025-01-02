import { Link } from "react-router-dom";

export const HomePage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<h1 className="text-center text-xl font-bold tracking-wide">
				MI VITRINA
			</h1>

			<ul className="flex flex-col gap-3 items-center max-w-xl mx-auto w-full">
				<li className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600">
					<Link to={"/sign"}>INICIAR SESIÓN</Link>
				</li>
				<li className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600">
					<Link to={"/profile"}>PERFIL</Link>
				</li>
			</ul>
		</main>
	);
};
