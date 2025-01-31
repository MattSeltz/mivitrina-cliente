import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//SERVICES
import { postData } from "../services/services";

//CONTEXTS
import { useUserContext } from "../contexts/UserContext";

//HELPERS
import { handleError } from "../helpers/handleError";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";
import { Input } from "../components/reutilizables/Input";
import { Button } from "../components/reutilizables/Button";
import { BackLink } from "../components/reutilizables/BackLink";

export const SignInPage = () => {
	const navigate = useNavigate();

	const { userId, setUserId } = useUserContext();

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
				setUserId(res[1].id);
				navigate("/profile");
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
				INICIAR SESIÓN
			</h1>

			<form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-5"
			>
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

				<Link to={"/recovery"}>¿OLVIDASTE TU CONTRASEÑA?</Link>
				<Button>INICIAR SESIÓN</Button>
			</form>
		</main>
	);
};
