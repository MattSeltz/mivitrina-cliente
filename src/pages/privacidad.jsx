//COMPONENTS
import { BackLink } from "../components/reutilizables/BackLink";

export const PrivacidadPage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<BackLink />

			<h1 className="text-center text-xl font-bold tracking-wide">
				POLITICAS DE PRIVACIDAD
			</h1>

			<section className="max-w-xl mx-auto flex flex-col gap-3 text-white/50 text-xs">
				<h3 className="text-base text-white">1. Recopilación de Información</h3>
				<p>
					Recopilamos información proporcionada por los usuarios al registrarse
					o utilizar la Aplicación, como nombre, correo electrónico, y detalles
					del negocio.
				</p>

				<h3 className="text-base text-white">2. Uso de la Información</h3>
				<p>
					Utilizamos la información recopilada para: Proveer y mejorar la
					experiencia del usuario en la Aplicación. Personalizar las vitrinas
					creadas por los usuarios. Enviar notificaciones relacionadas con el
					uso de la Aplicación.
				</p>

				<h3 className="text-base text-white">3. Compartir Información</h3>
				<p>
					No compartimos su información personal con terceros, excepto cuando
					sea necesario para: Cumplir con requisitos legales. Proveer servicios
					específicos a través de socios confiables, bajo estrictas medidas de
					confidencialidad.
				</p>

				<h3 className="text-base text-white">4. Seguridad</h3>
				<p>
					Implementamos medidas razonables para proteger su información personal
					contra accesos no autorizados o uso indebido. Sin embargo, no podemos
					garantizar una seguridad absoluta.
				</p>

				<h3 className="text-base text-white">5. Derechos del Usuario</h3>
				<p>
					Usted tiene derecho a: Acceder, rectificar o eliminar su información
					personal. Retirar su consentimiento para el uso de sus datos. Para
					ejercer estos derechos, puede contactarnos a través del correo:
					mivitrina.corp@gmail.com.
				</p>

				<h3 className="text-base text-white">
					6. Cambios en la Política de Privacidad
				</h3>
				<p>
					Nos reservamos el derecho de modificar esta Política de Privacidad en
					cualquier momento. Los cambios serán notificados a través de la
					Aplicación.
				</p>

				<h3 className="text-base text-white">7. Contacto</h3>
				<p>
					Si tiene dudas sobre estos Términos y Condiciones o nuestra Política
					de Privacidad, puede escribirnos a mivitrina.corp@gmail.com.
				</p>

				<h5 className="text-base text-white text-center mt-3">
					Fecha de última actualización: 27/01/2025
				</h5>
			</section>
		</main>
	);
};
