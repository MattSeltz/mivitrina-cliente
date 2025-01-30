export const handleError = (
	error,
	setShowAlert,
	setMessageOfAlert,
	setTypeOfAlert
) => {
	console.error(error.message);
	setShowAlert(true);
	setMessageOfAlert(error.message);
	setTypeOfAlert("error");
};
