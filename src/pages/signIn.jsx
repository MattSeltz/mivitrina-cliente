import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postData } from "../services/services";

import { Loading } from "../components/Loading";
import { Alert } from "../components/Alert";

export const SignInPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const reset = () => {
		setEmail("");
		setPassword("");
		setTypeOfAlert("");
		setMessageOfAlert("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email.trim() === "" || password.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("auth/login", { email, password });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Iniciando sesión...");
				setTypeOfAlert("success");
				reset();
				sessionStorage.setItem("id", res[1].id);
				navigate("/profile");
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al iniciar sesión");
				setTypeOfAlert("error");
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
			{showAlert && (
				<Alert
					type={typeOfAlert}
					message={messageOfAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}
			<Link
				to={"/"}
				className="rounded-full shadow-sm shadow-black h-10 w-10 absolute flex justify-center items-center"
			>
				⬅
			</Link>

			<h1 className="text-center text-xl font-bold tracking-wide">
				INICIAR SESIÓN
			</h1>

			<form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-5"
			>
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
				<Link to={"/recovery"}>¿OLVIDASTE TU CONTRASEÑA?</Link>
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
