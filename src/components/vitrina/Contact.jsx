export const Contact = ({ children, href }) => {
	return (
		<li>
			<a href={href} target="_blank" className="flex gap-1">
				{children}
			</a>
		</li>
	);
};
