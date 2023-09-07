export const sum = (array) => array.reduce((sum, current) => sum + current, 0);

export const sumWithField = (array, field) =>
	array.reduce((sum, current) => sum + Number(current[field]), 0);

export const sumWithMultiplyFields = (array, arrFields) =>
	array.reduce((sum, current) => {
		const sub = arrFields.reduce(
			(fieldMul, fieldCurrent) =>
				fieldMul * Number(current[fieldCurrent]),
			1
		);
		return sum + sub;
	}, 0);

export const calcStock = (buys, sells, products) => {
	const res = [...products];
	const findIndexById = (id) => res.findIndex((item) => item.id === id);
	res.forEach((item) => (item.stock = 0));
	buys.forEach((item) =>
		item.products.forEach((p) => {
			const index = findIndexById(p.productsId);
			res[index].stock += p.quantity;
		})
	);
	sells.forEach((item) =>
		item.products.forEach((p) => {
			const index = findIndexById(p.productsId);
			res[index].stock -= p.quantity;
		})
	);
	return res;
};
