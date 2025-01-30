import { useState } from "react";
import { useNavigate } from "react-router-dom";

//SERVICES
import { postData } from "../services/services";

//HELPERS
import { handleError } from "../helpers/handleError";

//COMPONENTS
import { Input } from "../components/reutilizables/Input";
import { Button } from "../components/reutilizables/Button";
import { Loading } from "../components/reutilizables/Loading";
import { Alert } from "../components/reutilizables/Alert";

export const SoportePage = () => {
	const navigate = useNavigate();

	const [asunto, setAsunto] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [typeOfAlert, setTypeOfAlert] = useState("");
	const [messageOfAlert, setMessageOfAlert] = useState("");

	const reset = () => {
		setAsunto("");
		setMessage("");
		setTypeOfAlert("");
		setMessageOfAlert("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!asunto || !message) {
			setShowAlert(true);
			setMessageOfAlert("Por favor, completa todos los campos");
			setTypeOfAlert("warning");
			return;
		}

		setIsLoading(true);

		try {
			const res = await postData("message", { asunto, message });

			if (res[0]) {
				setShowAlert(true);
				setMessageOfAlert("Enviando mensaje...");
				setTypeOfAlert("success");
				reset();
				navigate("/");
			} else {
				setShowAlert(true);
				setMessageOfAlert("Ocurrió un error al enviar el mensaje");
				setTypeOfAlert("error");
			}
		} catch (error) {
			handleError(error, setShowAlert, setMessageOfAlert, setTypeOfAlert);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		reset();
		navigate("/");
	};

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10">
			{showAlert && (
				<Alert
					type={typeOfAlert}
					message={messageOfAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}

			<h1 className="text-center text-xl font-bold tracking-wide">SOPORTE</h1>

			<form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="max-w-xl mx-auto w-full flex flex-col gap-3"
			>
				<Input id={"asunto"} type={"text"} value={asunto} setValue={setAsunto}>
					ASUNTO
				</Input>
				<div className="flex flex-col gap-1 md:gap-3">
					<label htmlFor="message">MENSAJE</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="rounded-md p-1 resize-none text-black focus:outline-none md:p-3"
						name="message"
						id="message"
						rows={7}
					></textarea>
				</div>
				<div className="flex justify-between">
					<button
						onClick={handleCancel}
						type="button"
						className="shadow-sm shadow-black rounded-md bg-red-500 p-3 mt-3 transition-colors hover:bg-red-600"
					>
						CANCELAR
					</button>
					<Button>ENVIAR</Button>
				</div>
			</form>
		</main>
	);
};
