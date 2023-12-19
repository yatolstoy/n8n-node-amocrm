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
		displayName: 'Status Name or ID',
		name: 'status_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		required: true,
		displayOptions,
	},
];
