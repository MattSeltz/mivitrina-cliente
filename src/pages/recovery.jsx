import { useState } from "react";
import { useNavigate } from "react-router-dom";

//SERVICES
import { postData, putData } from "../services/services";

//HELPERS
import { handleError } from "../helpers/handleError";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";
import { BackLink } from "../components/reutilizables/BackLink";
import { Input } from "../components/reutilizables/Input";
import { Button } from "../components/reutilizables/Button";

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
				setMessageOfAlert(res[1].error);
				setTypeOfAlert("error");
			}
		} catch (error) {
			handleError(error, setShowAlert, setMessageOfAlert, setTypeOfAlert);
		} finally {
			setIsLoading(false);
		}
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
				setMessageOfAlert(res[1].error);
				setTypeOfAlert("error");
			}
		} catch (error) {
			handleError(error, setShowAlert, setMessageOfAlert, setTypeOfAlert);
		} finally {
			setIsLoading(false);
		}
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
				setMessageOfAlert(res[1].error);
				setTypeOfAlert("error");
			}
		} catch (error) {
			handleError(error, setShowAlert, setMessageOfAlert, setTypeOfAlert);
		} finally {
			setIsLoading(false);
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
			<BackLink />

			<h1 className="text-center text-xl font-bold tracking-wide">
				REESTABLECER CONTRASEÑA
			</h1>

			{isSetPassword ? (
				<form
					onSubmit={handleSubmitPassword}
					autoComplete="off"
					className="max-w-xl mx-auto w-full flex flex-col gap-5"
				>
					<Input
						id={"password"}
						type={"password"}
						value={password}
						setValue={setPassword}
					>
						NUEVA CONTRASEÑA
					</Input>
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
					<Button>GUARDAR</Button>
				</form>
			) : (
				<form
					onSubmit={isSendCode ? handleSubmitCode : handleSubmit}
					autoComplete="off"
					className="max-w-xl mx-auto w-full flex flex-col gap-5"
				>
					{isSendCode ? (
						<Input id={"code"} type={"text"} value={code} setValue={setCode}>
							CÓDIGO
						</Input>
					) : (
						<Input
							id={"email"}
							type={"email"}
							value={email}
							setValue={setEmail}
						>
							EMAIL
						</Input>
					)}
					<Button>ENVIAR CÓDIGO</Button>
				</form>
			)}
		</main>
	);
};
