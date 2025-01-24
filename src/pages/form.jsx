import { useState } from "react";
import { useNavigate } from "react-router-dom";

//SERVICES
import { postData, putData } from "../services/services";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";
import { Input } from "../components/reutilizables/Input";
import { Image } from "../components/form/Image";
import { Day } from "../components/reutilizables/Day";
import { Contact } from "../components/reutilizables/Contact";
import { Button } from "../components/reutilizables/Button";

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
				<Input id={"title"} type={"text"} value={title} setValue={setTitle}>
					TITULO
				</Input>
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
				<Input
					id={"ubication"}
					type={"text"}
					value={ubication}
					setValue={setUbication}
				>
					UBICACIÓN
				</Input>

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
						<Image key={index} image={image} evt={() => removeImage(index)} />
					))}
				</ul>
				<p className="text-center my-5 text-xl font-bold">HORARIO</p>
				{[
					"lunes",
					"martes",
					"miercoles",
					"jueves",
					"viernes",
					"sabado",
					"domingo",
				].map((day, index) => (
					<Day key={index} dates={dates} setDates={setDates} day={day} />
				))}
				<p className="text-center my-5 text-xl font-bold">CONTACTO</p>
				<Contact
					id={"email"}
					type={"email"}
					value={contact.email}
					setValue={(e) =>
						setContact((prev) => ({ ...prev, email: e.target.value }))
					}
				>
					EMAIL
				</Contact>
				<Contact
					id={"telefono"}
					type={"tel"}
					value={contact.telefono}
					setValue={(e) =>
						setContact((prev) => ({ ...prev, telefono: e.target.value }))
					}
				>
					TELÉFONO
				</Contact>
				<Contact
					id={"whatsapp"}
					type={"tel"}
					value={contact.whatsapp}
					setValue={(e) =>
						setContact((prev) => ({ ...prev, whatsapp: e.target.value }))
					}
				>
					WHATSAPP
				</Contact>
				<Contact
					id={"instagram"}
					type={"text"}
					value={contact.instagram}
					setValue={(e) =>
						setContact((prev) => ({ ...prev, instagram: e.target.value }))
					}
				>
					INSTAGRAM
				</Contact>
				<Contact
					id={"facebook"}
					type={"text"}
					value={contact.facebook}
					setValue={(e) =>
						setContact((prev) => ({ ...prev, facebook: e.target.value }))
					}
				>
					FACEBOOK
				</Contact>

				<div className="flex justify-between">
					<button
						onClick={handleCancel}
						type="button"
						className="shadow-sm shadow-black rounded-md bg-red-500 p-3 mt-3 transition-colors hover:bg-red-600"
					>
						CANCELAR
					</button>
					<Button>GUARDAR</Button>
				</div>
			</form>
		</main>
	);
};
