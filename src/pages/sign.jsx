export const SignPage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<h1 className="text-center text-xl font-bold tracking-wide">
				INICIAR SESIÓN
			</h1>

			<form
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-5"
			>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="name">NOMBRE Y APELLIDO</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="name"
						id="name"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="email">EMAIL</label>
					<input
						className="rounded-md p-1  text-black focus:outline-none md:p-3"
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="password">CONTRASEÑA</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="password"
						name="password"
						id="password"
					/>
				</div>
				<button
					type="submit"
					className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
				>
					INICIAR SESIÓN
				</button>
			</form>
		</main>
	);
};
