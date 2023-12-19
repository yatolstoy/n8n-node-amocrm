export const getTimestampFromDateString = (dateString: string | undefined): number | undefined => {
	if (!dateString) return;
	return Math.round(new Date(dateString).valueOf() / 1000);
};
