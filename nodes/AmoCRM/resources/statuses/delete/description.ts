import { IDisplayOptions } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['statuses'],
		operation: ['delete'],
	},
};

export const description: ILeadsProperties = [
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		required: true,
		displayOptions,
	},
];
