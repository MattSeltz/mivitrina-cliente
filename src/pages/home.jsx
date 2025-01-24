import { useState } from "react";

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
