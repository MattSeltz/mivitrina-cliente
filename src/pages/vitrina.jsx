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
			.then((res) => res && setSite(res[1]))
			.catch((e) => console.error(e))
			.finally(() => setIsLoading(false));
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<main className="flex flex-col gap-10 p-10">
			{userId === site?.user._id && (
				<Header isNotOpen={isNotOpen} setIsNotOpen={setIsNotOpen} slug={slug} />
			)}

			<h1 className="text-center text-xl font-bold tracking-wide">
				{site?.title}
			</h1>

			<img src={site?.galery[0].uri} alt={site?.title} className="md:hidden" />

			<ul className="hidden gap-10 justify-center md:flex">
				{site?.galery.map((item) => (
					<Img key={item.id} item={item} site={site} />
				))}
			</ul>

			<p className="max-w-5xl mx-auto">{site?.description}</p>

			<p className="md:text-center">
				ENCONTRANOS EN <b>{site?.ubication}</b>
			</p>

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
