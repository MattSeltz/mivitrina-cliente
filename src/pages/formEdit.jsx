import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOneData, putData } from "../services/services";

export const FormEditPage = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ubication, setUbication] = useState("");
	const [images, setImages] = useState([]);
	const [dates, setDates] = useState({
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

	useEffect(() => {
		getOneData("site", location.pathname.split("/")[2])
			.then((res) => {
				setTitle(res[1].title);
				setDescription(res[1].description);
				setUbication(res[1].ubication);
				setDates(res[1].dates);
				setImages(res[1].galery);
				setContact(res[1].contact);
			})
			.catch((e) => console.error(e));
	}, []);

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
			tel: "",
			whatsapp: "",
			instagram: "",
			facebook: "",
		});
	};

	const removeImage = (index) => {
		const imagesCP = [...images];
		const newImages = imagesCP.filter((_, i) => i !== index);
		setImages(newImages);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !description || !images.length || !ubication) return;

		try {
			const res = await putData("site", location.pathname.split("/")[2], {
				title,
				description,
				ubication,
				dates,
				contact,
			});

			if (res[0]) {
				// await Promise.all(
				// 	images.map((file) => {
				// 		const reader = new FileReader();
				// 		reader.readAsDataURL(file);
				// 		reader.onloadend = async () => {
				// 			await postData(`site/${res[1]._id}/upload`, {
				// 				image: reader.result,
				// 			});
				// 		};
				// 	})
				// );

				reset();
				navigate(`/vitrina/${res[1]._id}`);
			} else {
				alert("Ocurrió un error al crear la vitrina");
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	const handleCancel = () => {
		reset();
		navigate("/profile");
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
				{images?.length < 3 ? (
					<div className="flex flex-col gap-1 md:gap-3">
						<label htmlFor="imagenes">IMAGENES</label>
						<input
							className="rounded-md p-1 text-black focus:outline-none md:p-3"
							type="file"
							name="imagenes"
							id="imagenes"
							accept=".jpg, .jpeg, .png"
							onChange={(e) =>
								setImages((prev) => [...prev, e.target.files[0]])
							}
						/>
					</div>
				) : (
					<p>MAXIMO 3 IMAGENES</p>
				)}
				<ul className="flex flex-col gap-10">
					{images?.map((image, index) => (
						<li key={index} className="relative">
							<img
								src={image.uri ? image.uri : URL.createObjectURL(image)}
								alt="imagen"
							/>
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
							style={{ opacity: dates?.lunes.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.lunes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.lunes.open}
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
								value={dates?.lunes.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										lunes: { ...prev.lunes, close: e.target.value },
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
							style={{ opacity: dates?.martes.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.martes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.martes.open}
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
								value={dates?.martes.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										martes: { ...prev.martes, close: e.target.value },
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
							style={{ opacity: dates?.miercoles.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.miercoles.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.miercoles.open}
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
								value={dates?.miercoles.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										miercoles: { ...prev.miercoles, close: e.target.value },
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
							style={{ opacity: dates?.jueves.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.jueves.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.jueves.open}
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
								value={dates?.jueves.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										jueves: { ...prev.jueves, close: e.target.value },
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
							style={{ opacity: dates?.viernes.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.viernes.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.viernes.open}
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
								value={dates?.viernes.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										viernes: { ...prev.viernes, close: e.target.value },
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
							style={{ opacity: dates?.sabado.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.sabado.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.sabado.open}
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
								value={dates?.sabado.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										sabado: { ...prev.sabado, close: e.target.value },
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
							style={{ opacity: dates?.domingo.checked ? 1 : 0.5 }}
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
					</div>
					{dates?.domingo.checked && (
						<div>
							<input
								type="time"
								className="rounded-md p-1 text-black focus:outline-none md:p-3"
								value={dates?.domingo.open}
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
								value={dates?.domingo.close}
								onChange={(e) =>
									setDates((prev) => ({
										...prev,
										domingo: { ...prev.domingo, close: e.target.value },
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
						value={contact?.email}
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
						value={contact?.tel}
						onChange={(e) =>
							setContact((prev) => ({ ...prev, tel: e.target.value }))
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
						value={contact?.whatsapp}
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
						value={contact?.instagram}
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
						value={contact?.facebook}
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
