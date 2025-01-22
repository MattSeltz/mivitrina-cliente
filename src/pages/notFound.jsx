import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen text-white text-center p-6"
			style={{ background: "linear-gradient(90deg, #141e30, #243b55)" }}
		>
			<h1 className="text-9xl font-extrabold mb-6">404</h1>
			<h2 className="text-2xl font-bold mb-4">Oops, página no encontrada</h2>
			<p className="text-lg mb-8 max-w-md">
				Lo sentimos, pero no pudimos encontrar la página que buscabas. Mientras
				estás aquí, ¿por qué no vuelves a la página de inicio y comienzas de
				nuevo?
			</p>
			<Link
				to="/"
				className="px-8 py-3 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all"
			>
				Volver al inicio
			</Link>
		</div>
	);
};
