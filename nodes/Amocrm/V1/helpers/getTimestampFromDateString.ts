export const getTimestampFromDateString = (
	dateString: string | number | undefined,
): number | undefined => {
	if (!dateString) return;
	if (typeof dateString === 'number') return dateString;
	return Math.round(new Date(dateString).valueOf() / 1000);
};
