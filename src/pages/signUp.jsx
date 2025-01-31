import { useState } from "react";
import { useNavigate } from "react-router-dom";

//SERVICES
import { postData } from "../services/services";

//HELPERS
import { handleError } from "../helpers/handleError";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";
import { Input } from "../components/reutilizables/Input";
import { Button } from "../components/reutilizables/Button";
import { BackLink } from "../components/reutilizables/BackLink";

export const SignUpPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [tcp, setTcp] = useState(false);

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setTypeOfAlert("");
		setMessageOfAlert("");
		setTcp(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		if (!tcp) {
			setShowAlert(true);
			setMessageOfAlert(
				"Debes aceptar los terminos y condiciones y las politicas de privacidad para continuar"
			);
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("auth/register", {
				name,
				email,
				password,
				tcp,
			});

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Registrando usuario...");
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
				REGISTRARSE
			</h1>

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
					CONTRASEÑA
				</Input>
				<div className="flex gap-3">
					<input
						type="checkbox"
						id="tcp"
						name="tcp"
						checked={tcp}
						onChange={(e) => setTcp(e.target.checked)}
					/>
					<label htmlFor="tcp">
						Acepto los{" "}
						<a
							href="/terminos"
							target="_blank"
							className="text-blue-500 transition-colors hover:text-blue-600"
						>
							terminos y condiciones{" "}
						</a>
						y las{" "}
						<a
							href="/privacidad"
							target="_blank"
							className="text-blue-500 transition-colors hover:text-blue-600"
						>
							politicas de privacidad
						</a>
					</label>
				</div>
				<Button>REGISTRARSE</Button>
			</form>
		</main>
	);
};
