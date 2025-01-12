import { useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
	const [isNotOpen, setIsNotOpen] = useState(true);

	return (
		<>
			<header className="flex justify-between items-center shadow-sm shadow-black p-10 relative">
				<h1 className="text-center text-xl font-bold tracking-widest">
					MI VITRINA
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
						className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
					>
						INICIAR SESIÓN
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
									to="/signUp"
									className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
								>
									REGISTRARSE
								</Link>
							</li>
							<li>
								<Link
									to="/signIn"
									className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
								>
									INICIAR SESIÓN
								</Link>
							</li>
						</ul>
					</nav>
				)}
			</header>
			<main className="flex flex-col gap-10 p-10">
				<p className="text-center text-xl font-bold tracking-wide">
					MI VITRINA
				</p>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
					delectus asperiores nulla, alias pariatur optio eum, dicta libero
					eveniet rerum est deleniti necessitatibus, eius accusantium laudantium
					quasi? A, eius?
				</p>

				<img
					src="https://cdn-icons-png.flaticon.com/128/17878/17878108.png"
					alt="mivitrina"
				/>

				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta minima
					animi laborum cumque ipsa reprehenderit, maxime asperiores repudiandae
					ducimus error enim? Officia quaerat tenetur quas dolor ab quae,
					voluptatem vero.
				</p>

				<p>CONTACTO</p>

				<ul>
					<li>contacto@mivitrina.com</li>
					<li>+542901486436</li>
				</ul>
			</main>
		</>
	);
};
