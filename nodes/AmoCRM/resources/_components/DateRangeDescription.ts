import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { INumRange, IStringRange } from '../../Interface';

export const addDateRangeDescription = (
	displayName: string,
	name: string,
	displayOptions?: IDisplayOptions,
): INodeProperties => {
	return {
		displayName,
		name,
		placeholder: 'Add Date Range',
		type: 'fixedCollection',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Date Range Properties',
				name: 'dateRangeCustomProperties',
				values: [
					{
						displayName: 'From',
						name: 'from',
						type: 'dateTime',
						required: true,
						default: '',
					},
					{
						displayName: 'To',
						name: 'to',
						type: 'dateTime',
						required: true,
						default: '',
					},
				],
			},
		],
	};
};

export const makeRangeProperty = (obj: IStringRange | undefined): INumRange | undefined => {
	if (!obj) return undefined;
	const from = Math.round(new Date(obj?.from).valueOf() / 1000);
	const to = Math.round(new Date(obj?.to).valueOf() / 1000);
	return {
		from,
		to,
	};
};
