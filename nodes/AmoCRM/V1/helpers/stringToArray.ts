import { isNumber } from './isNumber';

export const stringToArray = (str: string | undefined): Array<string | number> => {
	if (!str) return [];
	return str.split(',').map((v) => {
		const value = v.trim();
		return isNumber(value) ? Number(value) : String(value);
	});
};
