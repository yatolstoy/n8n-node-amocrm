export const isJson = (str: string): boolean => {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
};
