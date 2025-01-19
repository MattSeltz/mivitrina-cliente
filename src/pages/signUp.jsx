import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postData } from "../services/services";

import { Loading } from "../components/Loading";

export const SignUpPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
			alert("Por favor, completa todos los campos");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("auth/register", { name, email, password });

			if (res[0]) {
				reset();
				navigate("/signIn");
			} else {
				alert("Ocurrió un error al crear el usuario");
			}
		} catch (error) {
			throw new Error(error);
		}

		setIsLoading(false);
	};

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10 relative">
			<Link
				to={"/"}
				className="rounded-full shadow-sm shadow-black h-10 w-10 absolute flex justify-center items-center"
			>
				⬅
			</Link>

			<h1 className="text-center text-xl font-bold tracking-wide">
				REGISTRARSE
			</h1>

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
					<label htmlFor="password">CONTRASEÑA</label>
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
					REGISTRARSE
				</button>
			</form>
		</main>
	);
};
