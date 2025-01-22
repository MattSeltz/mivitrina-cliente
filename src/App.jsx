import { Router } from "./router/router";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
	return (
		<UserProvider>
			<Router />
		</UserProvider>
	);
};
