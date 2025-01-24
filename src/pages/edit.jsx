import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//SERVICES
import { deleteData, getOneData, putData } from "../services/services";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";
import { Input } from "../components/reutilizables/Input";
import { Button } from "../components/reutilizables/Button";
import { Site } from "../components/edit/Site";

//ICONS
import { Trash } from "../icons/Trash";
import { Back } from "../icons/Back";

export const EditPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [sites, setSites] = useState([]);

	useEffect(() => {
		getOneData("user", sessionStorage.getItem("id"))
			.then((res) => {
				setName(res[1].name);
				setEmail(res[1].email);
				setSites(res[1].sites);
				setIsLoading(false);
			})
			.catch((e) => console.error(e));
	}, []);

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setTypeOfAlert("");
		setMessageOfAlert("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert(
				"Por favor, completa los campos 'EMAIL' y 'NOMBRE Y APELLIDO'"
			);
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = password
				? await putData("user", sessionStorage.getItem("id"), {
						name,
						email,
						password,
				  })
				: await putData("user", sessionStorage.getItem("id"), {
						name,
						email,
				  });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Registrando usuario...");
				setTypeOfAlert("success");
				reset();
				navigate("/profile");
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al editar el usuario");
				setTypeOfAlert("error");
			}
		} catch (error) {
			throw new Error(error);
		}
		setIsLoading(false);
	};

	const handleClickDeleteSite = async (id) => {
		setIsLoading(true);
		try {
			await deleteData("site", id);
			const cpSites = [...sites];
			const filteredSites = cpSites.filter((site) => site._id !== id);

			const res = await putData("user", sessionStorage.getItem("id"), {
				sites: filteredSites,
			});

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Eliminando sitio...");
				setTypeOfAlert("success");
				setSites(filteredSites);
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al eliminar el sitio");
				setTypeOfAlert("error");
			}
			setIsLoading(false);
		} catch (error) {
			throw new Error(error);
		}
	};

	const handleClickDelete = async () => {
		try {
			if (confirm("Estas seguro que deseas eliminar tu usuario")) {
				setIsLoading(true);
				const cpSites = [...sites];
				await Promise.all(
					cpSites.map(async (site) => {
						await deleteData("site", site._id);
					})
				);

				const res = await deleteData("user", sessionStorage.getItem("id"));

				if (res[0]) {
					setShowAlert(true);
					setMessageOfAlert("Eliminando usuario...");
					setTypeOfAlert("success");
					navigate("/");
					sessionStorage.removeItem("id");
				} else {
					setShowAlert(true);
					setMessageOfAlert("Ocurrió un error al eliminar tu usuario");
					setTypeOfAlert("error");
				}
				setIsLoading(false);
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10 relative">
			{showAlert && (
				<Alert
					type={typeOfAlert}
					message={messageOfAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}
			<Link
				to={"/profile"}
				className="rounded-full shadow-sm shadow-black h-10 w-10 absolute flex justify-center items-center"
			>
				<Back />
			</Link>

			<h1 className="text-center text-xl font-bold tracking-wide">EDITAR</h1>

			<form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-5"
			>
				<Input id={"name"} type={"text"} value={name} setValue={setName}>
					NOMBRE Y APELLIDO
				</Input>
				<Input id={"email"} type={"email"} value={email} setValue={setEmail}>
					EMAIL
				</Input>
				<Input
					id={"password"}
					type={"password"}
					value={password}
					setValue={setPassword}
				>
					NUEVA CONTRASEÑA
				</Input>
				<Button>EDITAR</Button>
			</form>
			<p className="text-center text-xl font-bold tracking-wide ">MIS SITIOS</p>
			<ul className="max-w-xl mx-auto w-full">
				{sites.map((site) => (
					<Site
						key={site._id}
						site={site}
						handleClickDeleteSite={handleClickDeleteSite}
					/>
				))}
			</ul>
			<button
				onClick={handleClickDelete}
				type="button"
				className="rounded-md max-w-xl mx-auto w-full flex justify-center items-center gap-1 shadow-sm shadow-black p-3 bg-red-500 transition-colors hover:bg-red-600"
			>
				<Trash /> ELIMINAR
			</button>
		</main>
	);
};
