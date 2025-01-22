import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext debe ser usado dentro de UserProvider");
	}

	return context;
};
