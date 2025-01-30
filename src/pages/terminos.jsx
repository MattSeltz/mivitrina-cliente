//COMPONENTS
import { BackLink } from "../components/reutilizables/BackLink";

export const TerminosPage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<BackLink />

			<h1 className="text-center text-xl font-bold tracking-wide">
				TERMINOS Y CONDICIONES
			</h1>

			<section className="max-w-xl mx-auto flex flex-col gap-3 text-white/50 text-xs">
				<h3 className="text-base text-white">1. Aceptación de los Términos</h3>
				<p>
					Al utilizar la aplicación {"MiVitrina"} (en adelante, la{" "}
					{"Aplicación"}), usted acepta estos Términos y Condiciones en su
					totalidad. Si no está de acuerdo con alguno de los términos aquí
					estipulados, le solicitamos que no utilice la Aplicación.
				</p>

				<h3 className="text-base text-white">2. Descripción del Servicio</h3>
				<p>
					{"MiVitrina"} es una aplicación gratuita diseñada para que las pymes
					puedan mostrar información básica de sus negocios a través de una
					plataforma sencilla. Los usuarios pueden crear vitrinas virtuales con
					información como horarios, productos y servicios.
				</p>

				<h3 className="text-base text-white">3. Uso de la Aplicación</h3>
				<p>
					La Aplicación es para uso personal y comercial limitado. No está
					permitido realizar actividades ilegales o no autorizadas utilizando
					{"MiVitrina"}. Usted es responsable de garantizar que cualquier
					contenido que cargue o comparta a través de la Aplicación cumpla con
					las leyes aplicables.
				</p>

				<h3 className="text-base text-white">4. Propiedad Intelectual</h3>
				<p>
					Todo el contenido y diseño de {"MiVitrina"} está protegido por
					derechos de autor y otras leyes de propiedad intelectual. Usted no
					puede copiar, modificar, distribuir ni reproducir ningún elemento de
					la Aplicación sin autorización previa.
				</p>

				<h3 className="text-base text-white">
					5. Limitación de Responsabilidad
				</h3>
				<p>
					{"MiVitrina"} se proporciona {"tal cual"} y no garantizamos que la
					aplicación estará libre de errores, interrupciones o vulnerabilidades.
					No nos hacemos responsables de daños directos, indirectos o
					consecuentes derivados del uso de la Aplicación.
				</p>

				<h3 className="text-base text-white">6. Modificaciones</h3>
				<p>
					Nos reservamos el derecho de actualizar o modificar estos Términos y
					Condiciones en cualquier momento. Las modificaciones entrarán en vigor
					a partir de su publicación en la Aplicación.
				</p>

				<h3 className="text-base text-white">7. Terminación</h3>
				<p>
					Podemos suspender o cancelar su acceso a {"MiVitrina"} en cualquier
					momento y sin previo aviso si incumple estos Términos y Condiciones.
				</p>

				<h3 className="text-base text-white">8. Legislación Aplicable</h3>
				<p>
					Estos Términos y Condiciones se regirán e interpretarán de acuerdo con
					las leyes del país donde operamos.
				</p>

				<h5 className="text-base text-white text-center mt-3">
					Fecha de última actualización: 27/01/2025
				</h5>
			</section>
		</main>
	);
};
