import { useState } from "react";
import fUserList from "../_fake/userList";
import { Form, Link } from "@remix-run/react";
function LoginPage() {
	// const auth = useContext(AuthContext);
	const userList = fUserList;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isReg, setIsreg] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userList);
	};
	return (
		<div>
			<h1>Login</h1>
			<Link to="/auth/register">Chưa có tài khoản?</Link>
			<Form method="post">
				<input name="email" placeholder="Email" />
				<input name="password" placeholder="Password" />
				<button type="submit" onClick={handleSubmit}>
					Đăng nhập
				</button>
			</Form>
		</div>
	);
}

export default LoginPage;
