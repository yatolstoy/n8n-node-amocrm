import { INodeProperties } from 'n8n-workflow';

import * as getList from './getList';
export { getList };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leads'],
			},
		},
		options: [
			{
				name: 'Get lead list',
				value: 'getList',
				description: 'Get list of leads',
				action: 'Get list of leads',
			},
		],
		default: 'getList',
	},
	...getList.description,
];
