import { api, getApiLink } from "~/config/api";
import { deleteData, getData, postData } from "./api.server";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error("No SESSION_SECRET");
}

const storage = createCookieSessionStorage({
	cookie: {
		name: "mt-inven",
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

export const createUserSession = async (userId, redirectTo) => {
	const session = await storage.getSession();
	session.set("userId", userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
};

const createUser = async (user) => {
	const passwordHash = await bcrypt.hash(user.password, 10);
	const newUser = await postData(getApiLink.base(api.type.users), {
		email: user.email,
		password: passwordHash,
		settingId: 1,
		roleId: user.roleId,
		username: "",
		fullName: user.fullName,
		regDate: new Date().toISOString(),
		country: "",
		avatar: [],
		info: "",
		phone: "",
		birthday: "",
		address: "",
		lastLogin: new Date().toISOString(),
	});
	return { id: newUser.id, email: user.email };
};

export const register = async (user) => {
	const exists = await getData(
		getApiLink.filter(api.type.users, "email", user.email)
	);
	const regCodeList = await getData(getApiLink.base(api.type.regcode));

	if (exists.length) {
		return json({ error: "Email này đã được đăng ký" });
	}

	const codeIndex = regCodeList.findIndex((item) => item.code === user.code);
	if (codeIndex === -1) {
		return json({
			error: "Sai mã tạo tài khoản",
		});
	}
	await deleteData(
		getApiLink.withId(api.type.regcode, regCodeList[codeIndex].id)
	);
	const newUser = await createUser({
		...user,
		roleId: regCodeList[codeIndex].rolesId,
	});
	if (!newUser) {
		return json({ error: `Error create user ${user.email}})` });
	}
	return createUserSession(newUser.id, "/home");
};

export const login = async (email, password) => {
	const users = await getData(
		getApiLink.filter(api.type.users, "email", email)
	);

	if (users.length === 1) {
		const user = users[0];
		const isSamePass = await bcrypt.compare(password, user.password);
		if (!user || !isSamePass) {
			return json({ error: "Sai email hoặc mật khẩu" });
		}

		return createUserSession(user.id, "/home");
	} else {
		return json({ error: "Không tìm thấy tài khoản này!" });
	}
};

const getUserSession = (request) =>
	storage.getSession(request.headers.get("Cookie"));

export const getUserId = async (request) => {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "number") return null;
	return userId;
};

export const requireUserId = async (request, redirectTo) => {
	const userId = await getUserId(request);
	if (!userId || typeof userId !== "number") {
		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
		throw redirect(`/auth?${searchParams}`);
	}
	return userId;
};

export const logout = async (request) => {
	const session = await getUserSession(request);
	console.error("to logout session", session);
	return redirect("/auth", {
		headers: {
			"Set-Cookie": await storage.destroySession(session),
		},
	});
};

export const getUser = async (request) => {
	const userId = getUserId(request);
	if (typeof userId !== "number") return null;
	try {
		const users = await getData(
			getApiLink.filter(api.type.users, "id", userId)
		);
		return users[0];
	} catch {
		throw logout(request);
	}
};
