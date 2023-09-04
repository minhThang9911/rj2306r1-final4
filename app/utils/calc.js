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
