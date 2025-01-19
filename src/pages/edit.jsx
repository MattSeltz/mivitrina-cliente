import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { deleteData, getOneData, putData } from "../services/services";

import { Loading } from "../components/Loading";

export const EditPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
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
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "") {
			alert("Por favor, completa los campos 'EMAIL' y 'NOMBRE Y APELLIDO'");
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
				reset();
				navigate("/profile");
			} else {
				alert("Ocurrió un error al editar el usuario");
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
				setSites(filteredSites);
			} else {
				alert("Ocurrió un error al eliminar el sitio");
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
					navigate("/");
					sessionStorage.removeItem("id");
				} else {
					alert("Ocurrió un error al eliminar tu usuario");
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
			<Link
				to={"/profile"}
				className="rounded-full shadow-sm shadow-black h-10 w-10 absolute flex justify-center items-center"
			>
				⬅
			</Link>

			<h1 className="text-center text-xl font-bold tracking-wide">EDITAR</h1>

			<form
				onSubmit={handleSubmit}
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
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="email">EMAIL</label>
					<input
						className="rounded-md p-1  text-black focus:outline-none md:p-3"
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="password">NUEVA CONTRASEÑA</label>
					<input
						className="rounded-md p-1 text-black focus:outline-none md:p-3"
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
				>
					EDITAR
				</button>
			</form>
			<p className="text-center text-xl font-bold tracking-wide">MIS SITIOS</p>
			<ul>
				{sites.map((site) => (
					<li key={site._id} className="flex justify-between items-center">
						<p>{site.title}</p>{" "}
						<button
							onClick={() => handleClickDeleteSite(site._id)}
							className="rounded-md mt-3 shadow-sm shadow-black p-3 bg-red-500 transition-colors hover:bg-red-600"
							type="button"
						>
							ELIMINAR
						</button>
					</li>
				))}
			</ul>
			<button
				onClick={handleClickDelete}
				type="button"
				className="rounded-md shadow-sm shadow-black p-3 bg-red-500 transition-colors hover:bg-red-600"
			>
				ELIMINAR
			</button>
		</main>
	);
};
