import { IUnsortedProperties } from '../../interfaces';
import { IDisplayOptions } from 'n8n-workflow';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['accept'],
	},
};

export const description: IUnsortedProperties = [
	{
		name: 'uid',
		displayName: 'ID Of Unsorted',
		type: 'number',
		default: 0,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Responsible User Name or ID',
		name: 'user_id',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		noDataExpression: false,
		displayOptions,
	},
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
		noDataExpression: false,
		displayOptions,
	},
];
