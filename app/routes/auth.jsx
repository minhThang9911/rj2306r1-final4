import { json, redirect } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";
import { api, getApiLink } from "~/config/api";
import { submitOption } from "~/config/constant";
import { deleteData, getData } from "~/server/api.server";
import { getUser, login, register } from "~/server/auth.server";
import {
	validateEmail,
	validateName,
	validatePassword,
} from "~/server/validators.server";

export const loader = async ({ request }) => {
	return (await getUser(request)) ? redirect("/") : null;
};

export const action = async ({ request }) => {
	const { _action, ...user } = await request.json();
	const error = {
		email: validateEmail(user.email),
		password: validatePassword(user.password),
		...(_action === "register"
			? { fullName: validateName(user.fullName) }
			: {}),
	};
	if (Object.values(error).some(Boolean)) {
		return json({
			error,
			user,
			_action,
		});
	}

	switch (_action) {
		case "login": {
			return await login(user.email, user.password);
		}
		case "register": {
			return await register(user);
		}
		default:
			return json({ error: "Có lỗi đăng nhập / đăng ký" });
	}
};

function LoginPage() {
	const submit = useSubmit();
	const [user, setUser] = useState({
		email: "",
		password: "",
		fullName: "",
		password2: "",
		code: "",
	});
	const handleChange = (e) => {
		setUser((pre) => ({
			...pre,
			[e.target.name]: e.target.value,
		}));
	};
	const [isReg, setIsreg] = useState(false);
	const handleSubmit = () => {
		let _action = "login";
		if (isReg) {
			_action = "register";
		}
		submit(
			{
				_action,
				...user,
			},
			submitOption
		);
	};
	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 relative">
			<button
				onClick={() => setIsreg(!isReg)}
				className="bg-green-500 text-white rounded-md px-2 py-1 absolute top-5 right-5 block w-40 hover:bg-green-400 hover:scale-110">
				{isReg ? "Đăng nhập" : "Đăng Ký"}
			</button>
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold">
								{isReg
									? "Chào mừng gia nhập!!"
									: "Chào mừng trở lại!!"}
							</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<div className="relative">
									<input
										autoComplete="off"
										id="email"
										name="email"
										type="text"
										className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
										placeholder="Địa chỉ Email"
										value={user.email}
										onChange={handleChange}
									/>
									<label
										htmlFor="email"
										className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
										Địa chỉ Email
									</label>
								</div>
								<div className="relative">
									<input
										autoComplete="off"
										id="password"
										name="password"
										type="password"
										className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
										placeholder="Mật khẩu"
										value={user.password}
										onChange={handleChange}
									/>
									<label
										htmlFor="password"
										className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
										Mật khẩu
									</label>
								</div>
								<div className="relative">
									<input
										autoComplete="off"
										id="password2"
										name="password2"
										type="password"
										className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
										placeholder="Nhập lại Mật khẩu"
										value={user.password2}
										onChange={handleChange}
									/>
									<label
										htmlFor="password2"
										className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
										Nhập lại Mật khẩu
									</label>
								</div>
								{isReg && (
									<div className="relative">
										<input
											autoComplete="off"
											id="fullName"
											name="fullName"
											type="text"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
											placeholder="Tên người dùng"
											value={user.fullName}
											onChange={handleChange}
										/>
										<label
											htmlFor="fullName"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
											Tên người dùng
										</label>
									</div>
								)}
								{isReg && (
									<div className="relative">
										<input
											autoComplete="off"
											id="code"
											name="code"
											type="text"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
											placeholder="Mã tạo tài khoản"
											value={user.code}
											onChange={handleChange}
										/>
										<label
											htmlFor="code"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
											Mã tạo tài khoản
										</label>
									</div>
								)}
								<div className="relative">
									<button
										className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-400 hover:scale-110"
										onClick={handleSubmit}>
										{isReg ? "Đăng Ký" : "Đăng nhập"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
