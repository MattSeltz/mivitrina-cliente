import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//SERVICES
import { deleteData, getOneData } from "../services/services";

//CONTEXTS
import { useUserContext } from "../contexts/UserContext";

//ICONS
import { Loading } from "../components/reutilizables/Loading";
import { Header } from "../components/profile/Header";
import { Site } from "../components/profile/Site";

//ICONS
import { More } from "../icons/More";

export const ProfilePage = () => {
	const navigate = useNavigate();

	const { userId, setUserId } = useUserContext();

	const [isLoading, setIsLoading] = useState(true);
	const [isNotOpen, setIsNotOpen] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		getOneData("user", sessionStorage.getItem("id"))
			.then((res) => {
				res && setUser(res[1]);
				setIsLoading(false);
			})
			.catch((e) => console.error(e));
	}, []);

	const handleClick = async () => {
		try {
			await deleteData("auth/cookie", "0987654321");
			setUserId(null);
			sessionStorage.removeItem("id");
			navigate("/");
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<>
			<Header
				user={user}
				handleClick={handleClick}
				isNotOpen={isNotOpen}
				setIsNotOpen={setIsNotOpen}
			/>

			<main className="flex flex-col gap-10 p-10">
				<p className="text-center text-xl font-bold tracking-wide">
					MIS SITIOS
				</p>

				<ul className="flex flex-col gap-3 items-center max-w-md mx-auto w-full">
					{user?.sites.map((site) => (
						<Site key={site._id} site={site} />
					))}
				</ul>

				<Link
					to="/add"
					className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors absolute bottom-5 right-5 hover:bg-blue-600"
				>
					<More /> AÑADIR
				</Link>
			</main>
		</>
	);
};
