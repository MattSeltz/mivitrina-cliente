//COMPONENTS
import { BackLink } from "../components/reutilizables/BackLink";

export const PreguntasPage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<BackLink />

			<h1 className="text-center text-xl font-bold tracking-wide">
				PREGUNTAS FRECUENTES
			</h1>

			<section className="max-w-xl mx-auto flex flex-col gap-3 text-white/50 text-xs">
				<h2 className="my-3 text-xl text-white">GENERAL</h2>
				<h3 className="text-base text-white">¿Qué es MiVitrina?</h3>
				<p>
					MiVitrina es una aplicación diseñada para ayudar a pequeñas y medianas
					empresas (pymes) a crear páginas web sencillas y atractivas que
					muestren información básica sobre su negocio, sin necesidad de
					conocimientos técnicos.
				</p>
				<h3 className="text-base text-white">¿Quién puede usar MiVitrina?</h3>
				<p>
					Está pensada para emprendedores, pequeños negocios y pymes que buscan
					una forma fácil y rápida de tener presencia online profesional.
				</p>
				<h3 className="text-base text-white">
					¿MiVitrina está optimizada para dispositivos móviles?
				</h3>
				<p>
					Sí, todas las páginas creadas con MiVitrina están optimizadas para
					verse perfectamente en teléfonos, tabletas y computadoras.
				</p>

				<h2 className="my-3 text-xl text-white">FUNCIONALIDADES</h2>
				<h3 className="text-base text-white">
					¿Puedo añadir redes sociales o enlaces externos?
				</h3>
				<p>
					Sí, puedes incluir enlaces a tus redes sociales y otros sitios
					relevantes para tu negocio.
				</p>

				<h2 className="my-3 text-xl text-white">SOPORTE Y SEGURIDAD</h2>
				<h3 className="text-base text-white">¿Mi información está segura?</h3>
				<p>
					Sí, en MiVitrina priorizamos la seguridad de los datos de nuestros
					usuarios mediante encriptación y cumplimiento con regulaciones de
					privacidad.
				</p>
				<h3 className="text-base text-white">
					¿Qué hago si tengo problemas para configurar mi página?
				</h3>
				<p>
					Puedes contactarnos a través de nuestro sistema de soporte integrado
					en la aplicación o escribirnos a mivitrina.corp@gmail.com.
				</p>

				<h2 className="my-3 text-xl text-white">DOMINIO Y HOSTING</h2>
				<h3 className="text-base text-white">
					¿Qué pasa si no tengo un dominio?
				</h3>
				<p>
					MiVitrina te ofrece un subdominio gratuito en el formato
					mivitrina.vercel.app/vitrina/tunegocio.
				</p>
				<h3 className="text-base text-white">
					¿Necesito contratar un hosting aparte?
				</h3>
				<p>
					No, MiVitrina incluye hosting gratuito para todas las páginas creadas
					en nuestra plataforma.
				</p>

				<h2 className="my-3 text-xl text-white">OTRAS PREGUNTAS</h2>
				<h3 className="text-base text-white">
					¿Cuánto tiempo toma crear mi página con MiVitrina?
				</h3>
				<p>Crear tu página puede tomar menos de 5 minutos.</p>
				<h3 className="text-base text-white">
					¿Puedo cambiar mi contenido después de publicar la página?
				</h3>
				<p>
					Sí, puedes actualizar tu contenido en cualquier momento desde tu panel
					de control.
				</p>
			</section>
		</main>
	);
};
