import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { deleteData, getOneData } from "../services/services";

import { useUserContext } from "../contexts/UserContext";

import { Loading } from "../components/Loading";

//ICONS
import { Hamburguer } from "../icons/Hamburguer";
import { Cross } from "../icons/Cross";
import { Edit } from "../icons/Edit";
import { SignOut } from "../icons/SignOut";
import { More } from "../icons/More";

export const ProfilePage = () => {
	const navigate = useNavigate();

	const { useId, setUserId } = useUserContext();

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
			<header className="flex justify-between items-center shadow-sm shadow-black p-10">
				<h1 className="text-center text-xl font-bold tracking-widest">
					{user?.name}
				</h1>

				<div className="flex gap-5">
					<Link
						to={"/edit"}
						className="hidden justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600 md:flex"
					>
						<Edit /> EDITAR
					</Link>
					<button
						onClick={handleClick}
						type="button"
						className="hidden justify-center gap-1 items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600 md:flex"
					>
						<SignOut /> CERRAR SESIÓN
					</button>
				</div>

				<button
					onClick={() => setIsNotOpen(false)}
					type="button"
					className="rounded-full flex justify-center items-center shadow-sm shadow-black h-10 w-10 md:hidden"
				>
					{isNotOpen ? <Hamburguer /> : <Cross />}
				</button>

				{!isNotOpen && (
					<nav className="absolute right-10 top-10 md:hidden">
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
									to="/edit"
									className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-blue-500 p-3 tracking-widest transition-colors hover:bg-blue-600"
								>
									<Edit /> EDITAR
								</Link>
							</li>
							<li>
								<button
									onClick={handleClick}
									type="button"
									className="flex gap-1 justify-center items-center shadow-sm shadow-black rounded-md bg-red-500 p-3 tracking-widest transition-colors hover:bg-red-600"
								>
									<SignOut /> CERRAR SESIÓN
								</button>
							</li>
						</ul>
					</nav>
				)}
			</header>
			<main className="flex flex-col gap-10 p-10">
				<p className="text-center text-xl font-bold tracking-wide">
					MIS SITIOS
				</p>

				<ul className="flex flex-col gap-3 items-center max-w-md mx-auto w-full">
					{user?.sites.map((site) => (
						<li
							key={site._id}
							className="w-full shadow-sm shadow-black rounded-md text-center bg-blue-500 p-3 mt-3 transition-colors hover:bg-blue-600"
						>
							<Link to={`/vitrina/${site._id}`}>{site.title}</Link>
						</li>
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
