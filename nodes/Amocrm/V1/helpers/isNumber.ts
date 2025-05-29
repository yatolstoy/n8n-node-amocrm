export const isNumber = (v: string | number): boolean => {
	const value = String(v).trim();
	return value.length === Number(value).toString().length;
};
