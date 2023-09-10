export const validateEmail = (email) => {
	var validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (!email.length || !validRegex.test(email)) {
		return "Xin nhập đúng địa chỉ Email";
	}
};

export const validatePassword = (password) => {
	if (password.length < 5) {
		return "Mật khẩu ít nhất 5 ký tự";
	}
};

export const validateName = (name) => {
	if (!name.length) return `Vui lòng nhập tên`;
};
