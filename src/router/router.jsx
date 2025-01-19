import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/home";
import { VitrinaPage } from "../pages/vitrina";
import { ProfilePage } from "../pages/profile";
import { FormPage } from "../pages/form";
import { SignUpPage } from "../pages/signUp";
import { SignInPage } from "../pages/signIn";
import { RecoveryPage } from "../pages/recovery";
import { EditPage } from "../pages/edit";
import { FormEditPage } from "../pages/formEdit";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/vitrina/:id" element={<VitrinaPage />} />
			<Route path="/signUp" element={<SignUpPage />} />
			<Route path="/signIn" element={<SignInPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/add" element={<FormPage />} />
			<Route path="/recovery" element={<RecoveryPage />} />
			<Route path="/edit" element={<EditPage />} />
			<Route path="/vitrina/:id/edit" element={<FormEditPage />} />
		</Routes>
	);
};
