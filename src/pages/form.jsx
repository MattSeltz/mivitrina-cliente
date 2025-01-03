import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postData } from "../services/services";

export const FormPage = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [schedule, setSchedule] = useState({
		lunes: {
			checked: false,
			open: "",
			close: "",
		},
		martes: {
			checked: false,
			open: "",
			close: "",
		},
		miercoles: {
			checked: false,
			open: "",
			close: "",
		},
		jueves: {
			checked: false,
			open: "",
			close: "",
		},
		viernes: {
			checked: false,
			open: "",
			close: "",
		},
		sabado: {
			checked: false,
			open: "",
			close: "",
		},
		domingo: {
			checked: false,
			open: "",
			close: "",
		},
	});
	const [contact, setContact] = useState({
		email: "",
		telefono: "",
		whatsapp: "",
		instagram: "",
		facebook: "",
	});

	const reset = () => {
		setTitle("");
		setDescription("");
		setImages([]);
		setSchedule({
			lunes: {
				checked: false,
				open: "",
				close: "",
			},
			martes: {
				checked: false,
				open: "",
				close: "",
			},
			miercoles: {
				checked: false,
				open: "",
				close: "",
			},
			jueves: {
				checked: false,
				open: "",
				close: "",
			},
			viernes: {
				checked: false,
				open: "",
				close: "",
			},
			sabado: {
				checked: false,
				open: "",
				close: "",
			},
			domingo: {
				checked: false,
				open: "",
				close: "",
			},
		});
		setContact({
			email: "",
			telefono: "",
			whatsapp: "",
			instagram: "",
			facebook: "",
		});
	};

	const removeImage = (index) => {
		const imagesCP = [...images];
		const newImages = imagesCP.filter((image, i) => i !== index);
		setImages(newImages);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !description || !images.length) return;

		try {
			const res = await postData("site", {
				title,
				description,
				images,
				schedule,
				contact,
			});

			if (res[0]) {
				reset();
				navigate("/vitrina");
			} else {
				alert("Ocurrió un error al crear el usuario");
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<main className="flex flex-col gap-10 p-10">
			<form
				onSubmit={handleSubmit}
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
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="description">DESCRIPCIÓN</label>
					<textarea
						className="rounded-md p-1 resize-none text-black focus:outline-none md:p-3"
						name="description"
						id="description"
						rows={7}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				{images.length < 3 ? (
					<div className="flex flex-col gap-1 md:gap-3">
						<label htmlFor="imagenes">IMAGENES</label>
						<input
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
							type="file"
							name="imagenes"
							id="imagenes"
							accept=".jpg, .jpeg, .png"
							onChange={(e) => setImages((prev) => [...prev, e.target.files])}
						/>
					</div>
				) : (
					<p>MAXIMO 3 IMAGENES</p>
				)}
				<ul className="flex flex-col gap-10">
					{images.map((image, index) => (
						<li key={index} className="relative">
							<img src={URL.createObjectURL(image[0])} alt="imagen" />
							<button
								type="button"
								className="h-5 w-5 rounded-full bg-red-500 absolute top-1 right-1 text-xs"
								onClick={() => removeImage(index)}
							>
								X
							</button>
						</li>
					))}
				</ul>
				<p className="text-center my-5 text-xl font-bold">HORARIO</p>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="lunes"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							LUNES
						</label>
						<input
							type="checkbox"
							id="lunes"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									lunes: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.lunes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										lunes: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										lunes: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="martes"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							MARTES
						</label>
						<input
							type="checkbox"
							id="martes"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									martes: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.martes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										martes: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										martes: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="miercoles"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							MIERCOLES
						</label>
						<input
							type="checkbox"
							id="miercoles"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									miercoles: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.miercoles.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										miercoles: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										miercoles: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="jueves"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							JUEVES
						</label>
						<input
							type="checkbox"
							id="jueves"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									jueves: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.jueves.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										jueves: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										jueves: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="viernes"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							VIERNES
						</label>
						<input
							type="checkbox"
							id="viernes"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									viernes: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.viernes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										viernes: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										viernes: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="sabado"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							SABADO
						</label>
						<input
							type="checkbox"
							id="sabado"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									sabado: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.sabado.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										sabado: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										sabado: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div>
						<label
							htmlFor="domingo"
							style={{ opacity: schedule.lunes.checked ? 1 : 0.5 }}
						>
							DOMINGO
						</label>
						<input
							type="checkbox"
							id="domingo"
							className="hidden"
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									domingo: { checked: e.target.checked },
								}))
							}
						/>
					</div>
					{schedule.domingo.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										domingo: { open: e.target.value },
									}))
								}
							/>
							<span> - </span>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								onChange={(e) =>
									setSchedule((prev) => ({
										...prev,
										domingo: { close: e.target.value },
									}))
								}
							/>
						</div>
					)}
				</div>
				<p className="text-center my-5 text-xl font-bold">CONTACTO</p>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="email">EMAIL</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="email"
						name="email"
						id="email"
						value={contact.email}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, email: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="telefono">TELÉFONO</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="tel"
						name="telefono"
						id="telefono"
						value={contact.telefono}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, telefono: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="whatsapp">WHATSAPP</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="tel"
						name="whatsapp"
						id="whatsapp"
						value={contact.whatsapp}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, whatsapp: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="instagram">INSTAGRAM</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="instagram"
						id="instagram"
						value={contact.instagram}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, instagram: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="facebook">FACEBOOK</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="facebook"
						id="facebook"
						value={contact.facebook}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, facebook: e.target.value }))
						}
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
