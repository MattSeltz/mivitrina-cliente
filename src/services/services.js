import { ENVIRONMENT } from "../configs/configs";

export const getData = async (uri) => {
	try {
		const res = await fetch(`${ENVIRONMENT}/${uri}`, {
			method: "GET",
		});

		const data = await res.json();

		return res.ok ? [true, data] : [false, data];
	} catch (error) {
		throw new Error(error);
	}
};

export const getOneData = async (uri, id) => {
	try {
		const res = await fetch(`${ENVIRONMENT}/${uri}/${id}`, {
			method: "GET",
		});

		const data = await res.json();

		return res.ok ? [true, data] : [false, data];
	} catch (error) {
		throw new Error(error);
	}
};

export const postData = async (uri, body) => {
	try {
		const res = await fetch(`${ENVIRONMENT}/${uri}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return res.ok ? [true, data] : [false, data];
	} catch (error) {
		throw new Error(error);
	}
};

export const putData = async (uri, id, body) => {
	try {
		const res = await fetch(`${ENVIRONMENT}/${uri}/${id}`, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return res.ok ? [true, data] : [false, data];
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteData = async (uri, id) => {
	try {
		const res = await fetch(`${ENVIRONMENT}/${uri}/${id}`, {
			method: "DELETE",
		});

		const data = await res.json();

		return res.ok ? [true, data] : [false, data];
	} catch (error) {
		throw new Error(error);
	}
};
