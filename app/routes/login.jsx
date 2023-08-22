import { useState } from "react";
import LoginLayout from "../layouts/Login/Layout";
import * as S from "../layouts/Login/styles";
import fUserList from "../_fake/userList";
import styles from "../styles/login.module.css";
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
        <LoginLayout>
            <S.Container>
                <S.LoginCard>
                    <S.Title>Login</S.Title>
                    <S.Description>Chào mừng trở lại</S.Description>
                    <S.LoginOrReg onClick={() => setIsreg(!isReg)}>
                        {isReg ? "Đăng nhập" : "Chưa có tài khoản?"}
                    </S.LoginOrReg>
                    <S.Form onSubmit={handleSubmit}>
                        <S.Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            disabled={loading}
                            required
                        />
                        <S.Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            disabled={loading}
                            required
                        />

                        {error && (
                            <S.Error>Email chưa đăng ký tài khoản.</S.Error>
                        )}

                        <S.LoginButton
                            disabled={loading}
                            type="submit">
                            {isReg ? "Đăng ký" : "Đăng nhập"}
                        </S.LoginButton>
                    </S.Form>
                </S.LoginCard>
            </S.Container>
        </LoginLayout>
    );
}

export default LoginPage;
