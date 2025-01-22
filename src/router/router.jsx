import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useUserContext } from "../contexts/UserContext";

import { HomePage } from "../pages/home";
import { VitrinaPage } from "../pages/vitrina";
import { ProfilePage } from "../pages/profile";
import { FormPage } from "../pages/form";
import { SignUpPage } from "../pages/signUp";
import { SignInPage } from "../pages/signIn";
import { RecoveryPage } from "../pages/recovery";
import { EditPage } from "../pages/edit";
import { FormEditPage } from "../pages/formEdit";
import { NotFound } from "../pages/notFound";

export const Router = () => {
	const { userId, setUserId } = useUserContext();

	useEffect(() => {
		const id = sessionStorage.getItem("id");

		if (id) {
			setUserId(id);
		}
	}, []);

	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			{userId && (
				<>
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/add" element={<FormPage />} />
					<Route path="/edit" element={<EditPage />} />
					<Route path="/vitrina/:id/edit" element={<FormEditPage />} />
				</>
			)}
			<Route path="/recovery" element={<RecoveryPage />} />
			<Route path="/signUp" element={<SignUpPage />} />
			<Route path="/signIn" element={<SignInPage />} />
			<Route path="/vitrina/:id" element={<VitrinaPage />} />
			<Route path="/" element={<HomePage />} />
		</Routes>
	);
};
