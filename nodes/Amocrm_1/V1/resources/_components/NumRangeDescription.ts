import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addNumRangeDescription = (
	displayName: string,
	name: string,
	displayOptions?: IDisplayOptions,
): INodeProperties => {
	return {
		displayName,
		name,
		placeholder: 'Add Range',
		type: 'fixedCollection',
		displayOptions,
		default: {},
		options: [
			{
				displayName: 'Range',
				name: 'rangeCustom',
				values: [
					{
						displayName: 'From',
						name: 'from',
						type: 'number',
						required: true,
						default: '',
					},
					{
						displayName: 'To',
						name: 'to',
						type: 'number',
						required: true,
						default: '',
					},
				],
			},
		],
	};
};
