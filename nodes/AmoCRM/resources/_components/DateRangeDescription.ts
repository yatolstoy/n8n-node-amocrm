import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

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
