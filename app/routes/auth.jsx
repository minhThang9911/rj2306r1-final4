import { Button, TextField } from "@mui/material";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { api, getApiLink } from "~/config/api";
import { submitOption } from "~/config/constant";
import { deleteData, getData } from "~/server/api.server";
import { getUser, login, register } from "~/server/auth.server";
import {
	validateEmail,
	validateName,
	validatePassword,
	validatePasswordReTyping,
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
			? {
					fullName: validateName(user.fullName),
					password2: validatePasswordReTyping(
						user.password,
						user.password2
					),
			  }
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
	const validate = useActionData();
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
			<div className="absolute top-5 right-5 z-30">
				<Button
					sx={{
						display: "block",
					}}
					className="hover:scale-110"
					variant="contained"
					color="success"
					onClick={() => setIsreg(!isReg)}>
					{isReg ? "Đăng nhập" : "Đăng Ký"}
				</Button>
				{!isReg && (
					<div>
						<p>Email: admin@mail.com</p>
						<p>Password: 123456</p>
						<hr />
						<p>Email: thukho@mail.com</p>
						<p>Password: 123456</p>
					</div>
				)}
			</div>

			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold text-center">
								{isReg
									? "Chào mừng gia nhập!!"
									: "Chào mừng trở lại!!"}
							</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<TextField
									fullWidth
									label="Địa chỉ Email"
									variant="standard"
									value={user.email}
									name="email"
									onChange={handleChange}
									error={!!validate?.error?.email}
									helperText={validate?.error?.email ?? ""}
								/>

								<TextField
									fullWidth
									label="Mật khẩu"
									variant="standard"
									value={user.password}
									name="password"
									onChange={handleChange}
									error={!!validate?.error?.password}
									helperText={validate?.error?.password ?? ""}
								/>

								{isReg && (
									<>
										<TextField
											fullWidth
											label="Nhập lại mật khẩu"
											variant="standard"
											value={user.password2}
											name="password2"
											onChange={handleChange}
											error={!!validate?.error?.password2}
											helperText={
												validate?.error?.password2 ?? ""
											}
										/>
										<TextField
											fullWidth
											label="Họ và tên"
											variant="standard"
											value={user.fullName}
											name="fullName"
											onChange={handleChange}
											error={!!validate?.error?.fullName}
											helperText={
												validate?.error?.fullName ?? ""
											}
										/>
										<TextField
											fullWidth
											label="Mã tạo tài khoản"
											variant="standard"
											value={user.code}
											name="code"
											onChange={handleChange}
											error={!!validate?.error?.code}
											helperText={
												validate?.error?.code ?? ""
											}
										/>
									</>
								)}

								<Button
									fullWidth
									onClick={handleSubmit}
									variant="contained"
									color="info">
									{isReg ? "Đăng Ký" : "Đăng nhập"}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
