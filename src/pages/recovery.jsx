import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postData } from "../services/services";

export const RecoveryPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");

	const reset = () => {
		setEmail("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email.trim() === "") {
			alert("Por favor, completa todos los campos");
			return;
		}

		try {
			const res = await postData("user", { email });

			if (res[0]) {
				reset();
				navigate("/signIn");
			} else {
				alert("Ocurrió un error al crear el usuario");
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<main className="flex flex-col gap-10 p-10">
			<h1 className="text-center text-xl font-bold tracking-wide">
				REESTABLECER CONTRASEÑA
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
				<button
					type="submit"
					className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
				>
					ENVIAR CÓDIGO
				</button>
			</form>
		</main>
	);
};
