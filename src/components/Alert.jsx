import { useEffect } from "react";

export const Alert = ({ type = "info", message, onClose, duration = 5000 }) => {
	const typeStyles = {
		success: "bg-green-100 text-green-700 border-green-500",
		error: "bg-red-100 text-red-700 border-red-500",
		warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
		info: "bg-blue-100 text-blue-700 border-blue-500",
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (onClose) onClose();
		}, duration);

		return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
	}, [onClose, duration]);

	return (
		<div
			className={`
        fixed top-4 right-4 p-4 w-11/12 max-w-md border rounded shadow-lg z-50
        ${typeStyles[type]}
      `}
			role="alert"
		>
			<div className="flex items-center">
				<span className="flex-grow">{message}</span>
				{onClose && (
					<button
						className="ml-4 text-lg font-bold text-gray-700 hover:text-gray-900"
						onClick={onClose}
					>
						&times;
					</button>
				)}
			</div>
		</div>
	);
};
