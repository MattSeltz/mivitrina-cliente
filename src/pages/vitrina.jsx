import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOneData } from "../services/services";

export const VitrinaPage = () => {
	const [isNotOpen, setIsNotOpen] = useState(true);
	const [site, setSite] = useState(null);

	useEffect(() => {
		getOneData("site", location.pathname.split("/")[2])
			.then((res) => setSite(res[1]))
			.catch((e) => console.error(e));
	}, []);

	return (
		<main className="flex flex-col gap-10 p-10">
			{/* <Link
				to={"/site"}
				className="hidden absolute top-5 right-5 p-3 rounded-md bg-blue-500 transition-colors hover:bg-blue-600 md:block"
			>
				EDITAR
			</Link>
			<Link
				to={"/profile"}
				className="shadow-sm absolute top-5 right-5 flex justify-center items-center shadow-black font-bold rounded-full h-10 w-10 md:hidden"
			>
				X
			</Link> */}

			<div className="gap-5 hidden absolute right-10 md:flex">
				<Link
					to={"/edit"}
					className="hidden justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600 md:flex"
				>
					EDITAR
				</Link>
				<Link
					to="/profile"
					className="hidden justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600 md:flex"
				>
					VOLVER
				</Link>
			</div>

			<button
				onClick={() => setIsNotOpen(false)}
				type="button"
				className="rounded-full absolute right-10 shadow-sm shadow-black  h-10 w-10 md:hidden"
			>
				{isNotOpen ? "O" : "X"}
			</button>

			{!isNotOpen && (
				<nav className="absolute right-10 top-10">
					<ul className="flex flex-col gap-3">
						<button
							onClick={() => setIsNotOpen(true)}
							type="button"
							className="h-10 w-10 ml-auto"
						>
							X
						</button>
						<li>
							<Link
								to="/edit"
								className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
							>
								EDITAR
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className="flex justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
							>
								VOLVER
							</Link>
						</li>
					</ul>
				</nav>
			)}

			<h1 className="text-center text-xl font-bold tracking-wide">
				{site?.title}
			</h1>

			<img
				src="https://acdn.mitiendanube.com/stores/001/203/846/products/box-de-cosas-ricas-tante-sara-7b4e7f3eecb33ea40117180367798188-320-0.webp"
				alt="tante sara"
				className="md:hidden"
			/>

			<ul className="hidden gap-10 justify-center md:flex">
				<li>
					<img
						src="https://acdn.mitiendanube.com/stores/001/203/846/products/box-6-lingotes-tante-sara-968629e1cc22de46ac17180370206591-320-0.webp"
						alt="tante sara"
						className="rounded-md shadow-sm shadow-black"
					/>
				</li>
				<li>
					<img
						src="https://acdn.mitiendanube.com/stores/001/203/846/products/box-2-tante-sara1-1d45b1fed8a1ff625716952265640868-320-0.webp"
						alt="tante sara"
						className="rounded-md shadow-sm shadow-black"
					/>
				</li>
				<li>
					<img
						src="https://acdn.mitiendanube.com/stores/001/203/846/products/libro-tante-sara-tienda-online-11-f20b7ccdb061377ac015901272851262-320-0.webp"
						alt="tante sara"
						className="rounded-md shadow-sm shadow-black"
					/>
				</li>
			</ul>

			<p className="max-w-5xl mx-auto">{site?.description}</p>

			<p className="md:text-center">
				ENCONTRANOS EN <b>{site?.ubication}</b>
			</p>

			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18396.245944531063!2d-68.30721615449222!3d-54.80578993960385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4c2368c5630631%3A0x75c44765acae1afd!2sTante%20Sara%20-%20Caf%C3%A9%20%26%20Bar!5e0!3m2!1ses-419!2sar!4v1735822627396!5m2!1ses-419!2sar"
				width="100%"
				height="225"
				style={{ border: "0px" }}
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				className="max-w-3xl mx-auto md:h-96"
			></iframe>

			<p className="text-center">HORARIOS</p>

			<ul className="flex flex-col gap-5 max-w-md mx-auto w-full">
				{site?.dates.lunes.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Lunes</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.date.lunes.open} - {site?.date.lunes.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.martes.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Martes</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.martes.open} - {site?.dates.martes.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.miercoles.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Miercoles</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.miercoles.open} - {site?.dates.miercoles.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.jueves.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Jueves</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.jueves.open} - {site?.dates.jueves.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.viernes.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Viernes</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.viernes.open} - {site?.dates.viernes.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.sabado.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Sabado</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.sabado.open} - {site?.dates.sabado.close}
							</span>
						</div>
					</li>
				)}

				{site?.dates.domingo.checked && (
					<li className="flex justify-between items-center">
						<p>
							<b>Domingo</b>
						</p>
						<div className="flex flex-col">
							<span>
								{site?.dates.domingo.open} - {site?.dates.domingo.close}
							</span>
						</div>
					</li>
				)}
			</ul>

			<p className="text-center">CONTACTO</p>

			<ul className="flex flex-col gap-3 md:mx-auto md:flex-row md:gap-10">
				<li>
					<a href={`mailto:${site?.contact.email}`}>{site?.contact.email}</a>
				</li>
				<li>
					<a href={`tel:+54${site?.contact.tel}`}>+54{site?.contact.tel}</a>
				</li>
				<li>
					<a href={`https://wa.me/+54${site?.contact.whatsapp}`}>
						+54{site?.contact.whatsapp}
					</a>
				</li>
				<li>
					<a
						href={`https://instagram.com/${site?.contact.instagram}`}
						target="_blank"
					>
						{site?.contact.instagram}
					</a>
				</li>
				<li>
					<a
						href={`https://facebook.com/${site?.contact.facebook}`}
						target="_blank"
					>
						{site?.contact.facebook}
					</a>
				</li>
			</ul>
		</main>
	);
};
