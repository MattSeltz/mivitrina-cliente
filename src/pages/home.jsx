import { useState } from "react";
import { Link } from "react-router-dom";

//IMAGES
import Vitrina from "../assets/mivitrina.svg";

//COMPONENTS
import { Header } from "../components/home/Header";

//ICONS
import { Email } from "../icons/Email";

export const HomePage = () => {
	const [isNotOpen, setIsNotOpen] = useState(true);

	return (
		<>
			<Header isNotOpen={isNotOpen} setIsNotOpen={setIsNotOpen} />

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

				<Link to="/signUp" className="bg-blue-500 rounded-md p-3 mx-auto my-3">
					EMPIEZA GRATIS
				</Link>

				<section className="flex flex-col gap-10 md:flex-row justify-between">
					<div className="flex flex-col gap-3">
						<p>CONTACTO</p>

						<a
							href="mailto:mivitrina.corp@gmail.com"
							target="_blank"
							className="flex gap-1"
						>
							<Email /> mivitrina.corp@gmail.com
						</a>
					</div>
					<div className="flex flex-col gap-3">
						<p>SOPORTE</p>

						<Link
							to={"/soporte"}
							className="text-blue-500 transition-colors hover:text-blue-600"
						>
							ENVIANOS TU CONSULTA
						</Link>
					</div>
				</section>
			</main>

			<footer className="bg-gray-800 text-white py-4 px-4">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
					<p className="text-sm text-center md:text-left">
						© {new Date().getFullYear()} MiVitrina. Todos los derechos
						reservados.
					</p>
					<Link to={"/preguntas"} className="hover:underline text-sm">
						Preguntas frecuentes
					</Link>
					<ul className="flex space-x-4 mt-2 md:mt-0">
						<li>
							<Link className="hover:underline text-sm" to={"/terminos"}>
								{" "}
								Términos y condiciones
							</Link>
						</li>
						<li>
							<Link className="hover:underline text-sm" to={"/privacidad"}>
								Política de privacidad
							</Link>
						</li>
						<li>
							<a
								href="https://matias-seltzer.netlify.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline text-sm"
							>
								Desarrollado por Matías Seltzer
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</>
	);
};
