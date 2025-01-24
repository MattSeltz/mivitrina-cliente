export const Day = ({ dates, setDates, day }) => {
	return (
		<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
			<div className="flex justify-between md:gap-10">
				<label
					htmlFor={day}
					style={{ opacity: dates[day].checked ? 1 : 0.5 }}
					className="cursor-pointer"
				>
					{day.toUpperCase()}
				</label>
				<input
					type="checkbox"
					id={day}
					className="hidden"
					onChange={(e) =>
						setDates((prev) => ({
							...prev,
							[day]: { ...prev[day], checked: e.target.checked },
						}))
					}
				/>
				{dates[day].checked && (
					<>
						<label
							htmlFor={`corrido${day.toUpperCase()}`}
							style={{ opacity: dates[day].corrido ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							HORARIO CORRIDO
						</label>
						<input
							type="checkbox"
							id={`corrido${day.toUpperCase()}`}
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									[day]: { ...prev[day], corrido: e.target.checked },
								}))
							}
						/>
					</>
				)}
			</div>
			{dates[day].checked && (
				<div className="flex justify-between md:flex-col md:gap-3">
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									[day]: { ...prev[day], open: e.target.value },
								}))
							}
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									[day]: { ...prev[day], close: e.target.value },
								}))
							}
						/>
					</div>
					{!dates[day].corrido && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										[day]: { ...prev[day], openC: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										[day]: { ...prev[day], closeC: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
