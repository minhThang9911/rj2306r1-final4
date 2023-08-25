import { useState } from "react";

function LoginPage() {
    // const auth = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isReg, setIsreg] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
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
                                        autocomplete="off"
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Địa chỉ Email"
                                    />
                                    <label
                                        for="email"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        Địa chỉ Email
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        autocomplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Mật khẩu"
                                    />
                                    <label
                                        for="password"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        Mật khẩu
                                    </label>
                                </div>
                                {isReg && (
                                    <div className="relative">
                                        <input
                                            autocomplete="off"
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Tên người dùng"
                                        />
                                        <label
                                            for="name"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            Tên người dùng
                                        </label>
                                    </div>
                                )}
                                {isReg && (
                                    <div className="relative">
                                        <input
                                            autocomplete="off"
                                            id="code"
                                            name="code"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Mã tạo tài khoản"
                                        />
                                        <label
                                            for="code"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            Mã tạo tài khoản
                                        </label>
                                    </div>
                                )}
                                <div className="relative">
                                    <button className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-400 hover:scale-110">
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
