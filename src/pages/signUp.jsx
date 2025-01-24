import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//SERVICES
import { postData } from "../services/services";

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

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setTypeOfAlert("");
		setMessageOfAlert("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("auth/register", { name, email, password });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Registrando usuario...");
				setTypeOfAlert("success");
				reset();
				navigate("/signIn");
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al crear el usuario");
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
				<Button>REGISTRARSE</Button>
			</form>
		</main>
	);
};
