export const FormPage = () => {
	return (
		<main className="flex flex-col gap-10 p-10">
			<form
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-5"
			>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="title">TITULO</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="title"
						id="title"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="description">DESCRIPCIÓN</label>
					<textarea
						className="rounded-md p-1 resize-none text-black focus:outline-none md:p-3"
						name="description"
						id="description"
						rows={7}
					></textarea>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="imagenes">IMAGENES</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="file"
						name="imagenes"
						id="imagenes"
						accept=".jpg, .jpeg, .png"
					/>
				</div>
				<p className="text-center my-5 text-xl font-bold">HORARIO</p>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="lunes">LUNES</label>
						<input type="checkbox" id="lunes" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="martes">MARTES</label>
						<input type="checkbox" id="martes" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="miercoles">MIERCOLEs</label>
						<input type="checkbox" id="miercoles" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="jueves">JUEVES</label>
						<input type="checkbox" id="jueves" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="viernes">VIERNES</label>
						<input type="checkbox" id="viernes" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="sabado">SABADO</label>
						<input type="checkbox" id="sabado" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label htmlFor="domingo">DOMINGO</label>
						<input type="checkbox" id="domingo" className="hidden" />
					</div>
					<div>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
						<span> - </span>
						<input
							type="time"
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
						/>
					</div>
				</div>
				<p className="text-center my-5 text-xl font-bold">CONTACTO</p>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="email">EMAIL</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="telefono">TELÉFONO</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="tel"
						name="telefono"
						id="telefono"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="whatsapp">WHATSAPP</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="tel"
						name="whatsapp"
						id="whatsapp"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="instagram">INSTAGRAM</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="instagram"
						id="instagram"
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="facebook">FACEBOOK</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="facebook"
						id="facebook"
					/>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="shadow-sm shadow-black rounded-md bg-red-500 p-3 mt-3 transition-colors hover:bg-red-600"
					>
						CANCELAR
					</button>
					<button
						type="submit"
						className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
					>
						GUARDAR
					</button>
				</div>
			</form>
		</main>
	);
};
