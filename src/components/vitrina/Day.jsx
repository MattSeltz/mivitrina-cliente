export const Day = ({ site, day }) => {
	return (
		<li className="flex justify-between items-center">
			<p>
				<b>{day}</b>
			</p>
			<div className="flex flex-col">
				<span>
					{site?.dates[day.toLowerCase()].open} -{" "}
					{site?.dates[day.toLowerCase()].close}
				</span>
				{!site?.dates[day.toLowerCase()].corrido && (
					<span>
						{site?.dates[day.toLowerCase()].openC} -{" "}
						{site?.dates[day.toLowerCase()].closeC}
					</span>
				)}
			</div>
		</li>
	);
};
