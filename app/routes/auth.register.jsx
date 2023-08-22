import { Form, Link } from "@remix-run/react";

function RegisterPage() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<div>
			<h1>Đăng ký</h1>
			<Link to="/auth/login">Đã có tài khoản?</Link>
			<Form method="post">
				<input name="email" placeholder="Email" />
				<input name="password" placeholder="Password" />
				<input name="fullName" placeholder="Full Name" />

				<button type="submit" onClick={handleSubmit}>
					Đăng ký
				</button>
			</Form>
		</div>
	);
}

export default RegisterPage;
