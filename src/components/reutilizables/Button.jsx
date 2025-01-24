export const Button = ({ children }) => {
	return (
		<button
			type="submit"
			className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
		>
			{children}
		</button>
	);
};
