import { Link } from "react-router-dom";

export const URLModal = ({ url, isOpen }) => {
	if (!isOpen) return null;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(url);
			alert("URL copiada al portapapeles");
		} catch (error) {
			console.error("Error al copiar la URL", error);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div
				className="p-6 rounded-lg shadow-lg w-96 text-white"
				style={{
					background: "linear-gradient(90deg, #141e30, #243b55)",
				}}
			>
				<h2 className="text-lg font-semibold mb-3">URL Generada</h2>
				<input
					type="text"
					value={url}
					readOnly
					className="w-full p-2 border rounded-md bg-gray-900 text-white"
				/>
				<div className="flex justify-end mt-4 space-x-2">
					<button
						onClick={copyToClipboard}
						className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
					>
						Copiar
					</button>
					<Link to={url}>
						<button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
							Ver
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
