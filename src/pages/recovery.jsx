import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postData, putData } from "../services/services";

import { Loading } from "../components/Loading";
import { Alert } from "../components/Alert";

//ICONS
import { Back } from "../icons/Back";

export const RecoveryPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");
	const [email, setEmail] = useState("");
	const [isSendCode, setIsSendCode] = useState(false);
	const [code, setCode] = useState("");
	const [isSetPassword, setIsSetPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordR, setPasswordR] = useState("");

	const reset = () => {
		setEmail("");
		setTypeOfAlert("");
		setMessageOfAlert("");
		setIsSendCode(false);
		setCode("");
		setIsSetPassword(false);
		setPassword("");
		setPasswordR("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("email", { to: email });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Enviando código...");
				setTypeOfAlert("success");
				setIsSendCode(true);
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al enviar el código");
				setTypeOfAlert("error");
			}
		} catch (error) {
			throw new Error(error);
		}

		setIsLoading(false);
	};

	const handleSubmitCode = async (e) => {
		e.preventDefault();

		if (code.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("email/match", { id: code });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Cargando...");
				setTypeOfAlert("success");
				setIsSetPassword(true);
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al enviar el código");
				setTypeOfAlert("error");
			}
		} catch (error) {
			throw new Error(error);
		}

		setIsLoading(false);
	};

	const handleSubmitPassword = async (e) => {
		e.preventDefault();

		if (password.trim() === "" || passwordR.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		if (password.trim() !== passwordR.trim()) {
			setShowAlert(true);
			setMessageOfAlert("Las contraseñas no coinciden");
			setTypeOfAlert("error");
			return;
		}

		setIsLoading(true);

		try {
			const emailRes = await postData("email/user", { email });
			const res = await putData("auth/recovery", emailRes[1]._id, { password });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Cargando...");
				setTypeOfAlert("success");
				reset();
				navigate("/signIn");
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al enviar el código");
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
				<Back />
			</Link>
			<h1 className="text-center text-xl font-bold tracking-wide">
				REESTABLECER CONTRASEÑA
			</h1>

			{isSetPassword ? (
				<form
					onSubmit={handleSubmitPassword}
					autoComplete="off"
					className="max-w-xl mx-auto w-full flex flex-col gap-5"
				>
					<div className="flex flex-col gap-1 md:gap-3">
						<label htmlFor="password">NUEVA CONTRASEÑA</label>
						<input
							className="rounded-md p-1  text-black focus:outline-none md:p-3"
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 md:gap-3">
						<label htmlFor="passwordR">REPETIR NUEVA CONTRASEÑA</label>
						<input
							className={`${
								passwordR
									? password !== passwordR
										? "shadow-sm shadow-red-500"
										: "shadow-sm shadow-green-500"
									: ""
							} rounded-md p-1  text-black focus:outline-none md:p-3`}
							type="password"
							name="passwordR"
							id="passwordR"
							value={passwordR}
							onChange={(e) => setPasswordR(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
					>
						GUARDAR
					</button>
				</form>
			) : (
				<form
					onSubmit={isSendCode ? handleSubmitCode : handleSubmit}
					autoComplete="off"
					className="max-w-xl mx-auto w-full flex flex-col gap-5"
				>
					{isSendCode ? (
						<div className="flex flex-col gap-1 md:gap-3">
							<label htmlFor="code">CÓDIGO</label>
							<input
								className="rounded-md p-1  text-black focus:outline-none md:p-3"
								type="text"
								name="code"
								id="code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
						</div>
					) : (
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
					)}
					<button
						type="submit"
						className="shadow-sm shadow-black rounded-md bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
					>
						ENVIAR CÓDIGO
					</button>
				</form>
			)}
		</main>
	);
};
