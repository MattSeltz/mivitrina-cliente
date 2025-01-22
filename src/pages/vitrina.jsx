import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOneData } from "../services/services";

import { useUserContext } from "../contexts/UserContext";

import { Loading } from "../components/Loading";

//ICONS
import { Hamburguer } from "../icons/Hamburguer";
import { Cross } from "../icons/Cross";
import { Edit } from "../icons/Edit";
import { Email } from "../icons/Email";
import { Phone } from "../icons/Phone";
import { WhatsApp } from "../icons/WhatsApp";
import { Instagram } from "../icons/Instagram";
import { Facebook } from "../icons/Facebook";

export const VitrinaPage = () => {
	const { userId } = useUserContext();

	const [isLoading, setIsLoading] = useState(true);
	const [isNotOpen, setIsNotOpen] = useState(true);
	const [site, setSite] = useState(null);

	useEffect(() => {
		getOneData("site", location.pathname.split("/")[2])
			.then((res) => {
				res && setSite(res[1]);
				setIsLoading(false);
			})
			.catch((e) => console.error(e));
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10">
			{userId === site?.user._id && (
				<>
					<div className="gap-5 hidden absolute right-10 md:flex">
						<Link
							to={`/vitrina/${site?._id}/edit`}
							className="hidden justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600 md:flex"
						>
							<Edit /> EDITAR
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
						className="rounded-full flex justify-center items-center absolute right-10 shadow-sm shadow-black  h-10 w-10 md:hidden"
					>
						{isNotOpen ? <Hamburguer /> : <Cross />}
					</button>

					{!isNotOpen && (
						<nav className="absolute right-10 top-10">
							<ul className="flex flex-col gap-3">
								<button
									onClick={() => setIsNotOpen(true)}
									type="button"
									className="h-10 w-10 ml-auto flex justify-center items-center"
								>
									<Cross />
								</button>
								<li>
									<Link
										to={`/vitrina/${site?._id}/edit`}
										className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
									>
										<Edit /> EDITAR
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
				</>
			)}

			<h1 className="text-center text-xl font-bold tracking-wide">
				{site?.title}
			</h1>

			<img src={site?.galery[0].uri} alt={site?.title} className="md:hidden" />

			<ul className="hidden gap-10 justify-center md:flex">
				{site?.galery.map((item) => (
					<li key={item.id}>
						<img
							src={item.uri}
							alt={site?.title}
							className="rounded-md shadow-sm shadow-black h-52 w-52 object-cover"
						/>
					</li>
				))}
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
								{site?.dates.lunes.open} - {site?.dates.lunes.close}
							</span>
							{!site?.dates.lunes.corrido && (
								<span>
									{site?.dates.lunes.openC} - {site?.dates.lunes.closeC}
								</span>
							)}
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
							{!site?.dates.martes.corrido && (
								<span>
									{site?.dates.martes.openC} - {site?.dates.martes.closeC}
								</span>
							)}
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
							{!site?.dates.miercoles.corrido && (
								<span>
									{site?.dates.miercoles.openC} - {site?.dates.miercoles.closeC}
								</span>
							)}
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
							{!site?.dates.jueves.corrido && (
								<span>
									{site?.dates.jueves.openC} - {site?.dates.jueves.closeC}
								</span>
							)}
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
							{!site?.dates.viernes.corrido && (
								<span>
									{site?.dates.viernes.openC} - {site?.dates.viernes.closeC}
								</span>
							)}
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
							{!site?.dates.sabado.corrido && (
								<span>
									{site?.dates.sabado.openC} - {site?.dates.sabado.closeC}
								</span>
							)}
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
							{!site?.dates.domingo.corrido && (
								<span>
									{site?.dates.domingo.openC} - {site?.dates.domingo.closeC}
								</span>
							)}
						</div>
					</li>
				)}
			</ul>

			<p className="text-center">CONTACTO</p>

			<ul className="flex flex-col gap-3 md:mx-auto md:flex-row md:gap-10">
				<li>
					<a
						href={`mailto:${site?.contact.email}`}
						target="_blank"
						className="flex gap-1"
					>
						<Email /> {site?.contact.email}
					</a>
				</li>
				<li>
					<a
						href={`tel:+54${site?.contact.telefono}`}
						target="_blank"
						className="flex gap-1"
					>
						<Phone />
						+54{site?.contact.telefono}
					</a>
				</li>
				<li>
					<a
						href={`https://wa.me/+54${site?.contact.whatsapp}`}
						target="_blank"
						className="flex gap-1"
					>
						{" "}
						<WhatsApp />
						+54{site?.contact.whatsapp}
					</a>
				</li>
				<li>
					<a
						href={`https://instagram.com/${site?.contact.instagram}`}
						target="_blank"
						className="flex gap-1"
					>
						<Instagram /> {site?.contact.instagram}
					</a>
				</li>
				<li>
					<a
						href={`https://facebook.com/${site?.contact.facebook}`}
						target="_blank"
						className="flex gap-1"
					>
						<Facebook /> {site?.contact.facebook}
					</a>
				</li>
			</ul>
		</main>
	);
};
