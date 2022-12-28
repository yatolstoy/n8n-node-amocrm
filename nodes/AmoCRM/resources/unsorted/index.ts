import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
export { get };

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
		],
		default: 'get',
	},
	...get.description,
];
