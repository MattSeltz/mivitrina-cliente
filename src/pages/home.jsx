import { useState } from "react";
import { Link } from "react-router-dom";

import Vitrina from "../assets/mivitrina.svg";

//ICONS
import { Email } from "../icons/Email";
import { SignIn } from "../icons/SignIn";
import { Hamburguer } from "../icons/Hamburguer";
import { Cross } from "../icons/Cross";

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
					<nav className="absolute right-10 top-10">
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
			<main className="flex flex-col gap-10 p-10 max-w-3xl mx-auto">
				<p className="text-center text-xl font-bold tracking-wide">
					MI VITRINA
				</p>

				<p>
					Lleva tu negocio al siguiente nivel con MiVitrina: la forma más simple
					y rápida de mostrar lo que ofreces al mundo. Diseñada para
					emprendedores como tú, te permite crear una página profesional en
					minutos, sin necesidad de experiencia técnica.
				</p>

				<img src={Vitrina} alt="mivitrina" />

				<p>
					MiVitrina es perfecta para mostrar tus productos, servicios y toda la
					información que tus clientes necesitan. Con plantillas
					personalizables, diseño optimizado para móviles y herramientas de SEO
					integradas, tu negocio estará listo para destacar en línea. ¡Empieza
					ahora y haz que te encuentren fácilmente!
				</p>

				<p>CONTACTO</p>

				<a
					href="mailto:mivitrina.corp@gmail.com"
					target="_blank"
					className="flex gap-1"
				>
					<Email /> mivitrina.corp@gmail.com
				</a>
			</main>
		</>
	);
};
