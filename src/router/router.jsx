import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/home";
import { VitrinaPage } from "../pages/vitrina";
import { SignPage } from "../pages/sign";
import { ProfilePage } from "../pages/profile";
import { FormPage } from "../pages/form";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/vitrina" element={<VitrinaPage />} />
			<Route path="/sign" element={<SignPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/add" element={<FormPage />} />
		</Routes>
	);
};
