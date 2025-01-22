import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postData, putData } from "../services/services";

import { Loading } from "../components/Loading";
import { Alert } from "../components/Alert";

//ICONS
import { Photo } from "../icons/Photo";

export const FormPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ubication, setUbication] = useState("");
	const [images, setImages] = useState([]);
	const [dates, setDates] = useState({
		lunes: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		martes: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		miercoles: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		jueves: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		viernes: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		sabado: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
		},
		domingo: {
			checked: false,
			open: "",
			close: "",
			corrido: false,
			openC: "",
			closeC: "",
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
		setUbication("");
		setImages([]);
		setDates({
			lunes: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			martes: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			miercoles: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			jueves: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			viernes: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			sabado: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
			domingo: {
				checked: false,
				open: "",
				close: "",
				corrido: false,
				openC: "",
				closeC: "",
			},
		});
		setContact({
			email: "",
			tel: "",
			whatsapp: "",
			instagram: "",
			facebook: "",
		});
		setTypeOfAlert("");
		setMessageOfAlert("");
	};

	const removeImage = (index) => {
		const imagesCP = [...images];
		const newImages = imagesCP.filter((_, i) => i !== index);
		setImages(newImages);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!title ||
			!description ||
			images.length < 3 ||
			!ubication ||
			!contact.email ||
			!contact.facebook ||
			!contact.instagram ||
			!contact.telefono ||
			!contact.whatsapp
		) {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("site", {
				title,
				description,
				ubication,
				dates,
				contact,
			});

			if (res[0]) {
				await Promise.all(
					images.map((file) => {
						return new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onloadend = async () => {
								try {
									await postData(`site/${res[1]._id}/upload`, {
										image: reader.result,
									});
									resolve();
								} catch (error) {
									reject(error);
								}
							};
							reader.onerror = () => {
								reject(new Error("Error al leer el archivo"));
							};
						});
					})
				);

				await putData("user/populate", sessionStorage.getItem("id"), {
					site: res[1]._id,
				});
				await putData("site/populate", res[1]._id, {
					user: sessionStorage.getItem("id"),
				});
				setShowAlert(true);
				setMessageOfAlert("Registrando sitio...");
				setTypeOfAlert("success");
				reset();
				navigate(`/vitrina/${res[1]._id}`);
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al crear la vitrina");
				setTypeOfAlert("error");
			}
		} catch (error) {
			throw new Error(error);
		}
		setIsLoading(false);
	};

	const handleCancel = () => {
		reset();
		navigate("/profile");
	};

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10">
			{showAlert && (
				<Alert
					type={typeOfAlert}
					message={messageOfAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}
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
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="ubication">UBICACIÓN</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="text"
						name="ubication"
						id="ubication"
						value={ubication}
						onChange={(e) => setUbication(e.target.value)}
					/>
				</div>
				{images.length < 3 ? (
					<>
						<label
							htmlFor="imagenes"
							className="flex justify-center items-center gap-1 cursor-pointer"
						>
							<Photo /> IMAGENES
						</label>
						<input
							className="hidden"
							type="file"
							name="imagenes"
							id="imagenes"
							accept=".jpg, .jpeg, .png"
							onChange={(e) =>
								setImages((prev) => [...prev, e.target.files[0]])
							}
						/>
					</>
				) : (
					<p>MAXIMO 3 IMAGENES</p>
				)}
				<ul className="flex flex-col gap-10">
					{images.map((image, index) => (
						<li key={index} className="relative">
							<img src={URL.createObjectURL(image)} alt="imagen" />
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
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="lunes"
							style={{ opacity: dates.lunes.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							LUNES
						</label>
						<input
							type="checkbox"
							id="lunes"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									lunes: { ...prev.lunes, checked: e.target.checked },
								}))
							}
						/>
						{dates.lunes.checked && (
							<>
								<label
									htmlFor="corridoL"
									style={{ opacity: dates.lunes.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoL"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											lunes: { ...prev.lunes, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.lunes.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											lunes: { ...prev.lunes, open: e.target.value },
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
											lunes: { ...prev.lunes, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.lunes.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												lunes: { ...prev.lunes, openC: e.target.value },
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
												lunes: { ...prev.lunes, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="martes"
							style={{ opacity: dates.martes.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							MARTES
						</label>
						<input
							type="checkbox"
							id="martes"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									martes: { ...prev.martes, checked: e.target.checked },
								}))
							}
						/>
						{dates.martes.checked && (
							<>
								<label
									htmlFor="corridoMA"
									style={{ opacity: dates.martes.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoMA"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											martes: { ...prev.martes, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.martes.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											martes: { ...prev.martes, open: e.target.value },
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
											martes: { ...prev.martes, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.martes.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												martes: { ...prev.martes, openC: e.target.value },
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
												martes: { ...prev.martes, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="miercoles"
							style={{ opacity: dates.miercoles.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							MIERCOLES
						</label>
						<input
							type="checkbox"
							id="miercoles"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									miercoles: { ...prev.miercoles, checked: e.target.checked },
								}))
							}
						/>
						{dates.miercoles.checked && (
							<>
								<label
									htmlFor="corridoMI"
									style={{ opacity: dates.miercoles.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoMI"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											miercoles: {
												...prev.miercoles,
												corrido: e.target.checked,
											},
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.miercoles.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											miercoles: { ...prev.miercoles, open: e.target.value },
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
											miercoles: { ...prev.miercoles, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.miercoles.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												miercoles: { ...prev.miercoles, openC: e.target.value },
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
												miercoles: {
													...prev.miercoles,
													closeC: e.target.value,
												},
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="jueves"
							style={{ opacity: dates.jueves.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							JUEVES
						</label>
						<input
							type="checkbox"
							id="jueves"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									jueves: { ...prev.jueves, checked: e.target.checked },
								}))
							}
						/>
						{dates.jueves.checked && (
							<>
								<label
									htmlFor="corridoJ"
									style={{ opacity: dates.jueves.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoJ"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											jueves: { ...prev.jueves, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.jueves.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											jueves: { ...prev.jueves, open: e.target.value },
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
											jueves: { ...prev.jueves, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.jueves.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												jueves: { ...prev.jueves, openC: e.target.value },
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
												jueves: { ...prev.jueves, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="viernes"
							style={{ opacity: dates.viernes.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							VIERNES
						</label>
						<input
							type="checkbox"
							id="viernes"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									viernes: { ...prev.viernes, checked: e.target.checked },
								}))
							}
						/>
						{dates.viernes.checked && (
							<>
								<label
									htmlFor="corridoV"
									style={{ opacity: dates.viernes.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoV"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											viernes: { ...prev.viernes, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.viernes.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											viernes: { ...prev.viernes, open: e.target.value },
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
											viernes: { ...prev.viernes, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.viernes.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												viernes: { ...prev.viernes, openC: e.target.value },
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
												viernes: { ...prev.viernes, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="sabado"
							style={{ opacity: dates.sabado.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							SABADO
						</label>
						<input
							type="checkbox"
							id="sabado"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									sabado: { ...prev.sabado, checked: e.target.checked },
								}))
							}
						/>
						{dates.sabado.checked && (
							<>
								<label
									htmlFor="corridoS"
									style={{ opacity: dates.sabado.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoS"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											sabado: { ...prev.sabado, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.sabado.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											sabado: { ...prev.sabado, open: e.target.value },
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
											sabado: { ...prev.sabado, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.sabado.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												sabado: { ...prev.sabado, openC: e.target.value },
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
												sabado: { ...prev.sabado, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
					<div className="flex justify-between md:gap-10">
						<label
							htmlFor="domingo"
							style={{ opacity: dates.domingo.checked ? 1 : 0.5 }}
							className="cursor-pointer"
						>
							DOMINGO
						</label>
						<input
							type="checkbox"
							id="domingo"
							className="hidden"
							onChange={(e) =>
								setDates((prev) => ({
									...prev,
									domingo: { ...prev.domingo, checked: e.target.checked },
								}))
							}
						/>
						{dates.domingo.checked && (
							<>
								<label
									htmlFor="corridoD"
									style={{ opacity: dates.domingo.corrido ? 1 : 0.5 }}
									className="cursor-pointer"
								>
									HORARIO CORRIDO
								</label>
								<input
									type="checkbox"
									id="corridoD"
									className="hidden"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											domingo: { ...prev.domingo, corrido: e.target.checked },
										}))
									}
								/>
							</>
						)}
					</div>
					{dates.domingo.checked && (
						<div className="flex justify-between md:flex-col md:gap-3">
							<div>
								<input
									type="time"
									className="rounded-md p-1 text-black focus:outline-none md:p-3"
									onChange={(e) =>
										setDates((prev) => ({
											...prev,
											domingo: { ...prev.domingo, open: e.target.value },
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
											domingo: { ...prev.domingo, close: e.target.value },
										}))
									}
								/>
							</div>
							{!dates.domingo.corrido && (
								<div>
									<input
										type="time"
										className="rounded-md p-1 text-black focus:outline-none md:p-3"
										onChange={(e) =>
											setDates((prev) => ({
												...prev,
												domingo: { ...prev.domingo, openC: e.target.value },
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
												domingo: { ...prev.domingo, closeC: e.target.value },
											}))
										}
									/>
								</div>
							)}
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
						onClick={handleCancel}
						type="button"
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
