import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//SERVICES
import { getOneData } from "../services/services";

//CONTEXTS
import { useUserContext } from "../contexts/UserContext";

//COMPONENTS
import { Loading } from "../components/reutilizables/Loading";
import { Day } from "../components/vitrina/Day";
import { Contact } from "../components/vitrina/Contact";
import { Header } from "../components/vitrina/Header";
import { Img } from "../components/vitrina/Img";

//ICONS
import { Email } from "../icons/Email";
import { Phone } from "../icons/Phone";
import { WhatsApp } from "../icons/WhatsApp";
import { Instagram } from "../icons/Instagram";
import { Facebook } from "../icons/Facebook";

export const VitrinaPage = () => {
	const { userId } = useUserContext();
	const { slug } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [isNotOpen, setIsNotOpen] = useState(true);
	const [site, setSite] = useState(null);

	useEffect(() => {
		getOneData("site/title", slug)
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
				<Header
					site={site}
					isNotOpen={isNotOpen}
					setIsNotOpen={setIsNotOpen}
					slug={slug}
				/>
			)}

			<h1 className="text-center text-xl font-bold tracking-wide">
				{site?.title}
			</h1>

			<img src={site?.galery[0].uri} alt={site?.title} className="md:hidden" />

			<ul className="hidden gap-10 justify-center md:flex">
				{site?.galery.map((item) => (
					<Img key={item._id} item={item} site={site} />
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
				{[
					"Lunes",
					"Martes",
					"Miercoles",
					"Jueves",
					"Viernes",
					"Sabado",
					"Domingo",
				].map(
					(day, index) =>
						site?.dates[day.toLowerCase()].checked && (
							<Day key={index} site={site} day={day} />
						)
				)}
			</ul>

			<p className="text-center">CONTACTO</p>

			<ul className="flex flex-col gap-3 md:mx-auto md:flex-row md:gap-10">
				<Contact href={`mailto:${site?.contact.email}`}>
					<Email /> {site?.contact.email}
				</Contact>
				<Contact href={`tel:+54${site?.contact.telefono}`}>
					<Phone />
					+54{site?.contact.telefono}
				</Contact>
				<Contact href={`https://wa.me/+54${site?.contact.whatsapp}`}>
					<WhatsApp />
					+54{site?.contact.whatsapp}
				</Contact>
				<Contact href={`https://instagram.com/${site?.contact.instagram}`}>
					<Instagram /> {site?.contact.instagram}
				</Contact>
				<Contact href={`https://facebook.com/${site?.contact.facebook}`}>
					<Facebook /> {site?.contact.facebook}
				</Contact>
			</ul>
		</main>
	);
};
