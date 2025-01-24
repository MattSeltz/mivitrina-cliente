export const Input = ({ children, id, type, value, setValue }) => {
	return (
		<div className="flex flex-col gap-1 md:gap-3">
			<label htmlFor={id}>{children}</label>
			<input
				className="rounded-md p-1 text-black focus:outline-none md:p-3"
				type={type}
				name={id}
				id={id}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};
