import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as createFromCall from './create/fromCall';
export { get, createFromCall };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['unsorted'],
			},
		},
		options: [
			{
				name: 'Get list',
				value: 'get',
				description: 'Get unsorted',
				action: 'Get unsorted',
			},
			{
				name: 'Create from call',
				value: 'createFromCall',
				description: 'Create unsorted from call',
				action: 'Create unsorted',
			},
		],
		default: 'get',
	},
	...get.description,
	...createFromCall.description,
];
