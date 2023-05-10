import { IUnsortedProperties } from '../../interfaces';
import { IDisplayOptions } from 'n8n-workflow';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['reject'],
	},
};

export const description: IUnsortedProperties = [
	{
		name: 'uid',
		displayName: 'Unsorted ID',
		type: 'number',
		default: 0,
		required: true,
		description: 'Unsorted ID',
		displayOptions,
	},
	{
		displayName: 'User',
		name: 'user_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: false,
		displayOptions,
	},
];
