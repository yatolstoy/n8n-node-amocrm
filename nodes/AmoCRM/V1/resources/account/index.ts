import { INodeProperties } from 'n8n-workflow';

import * as getInfo from './getInfo';
export { getInfo };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Get Info',
				value: 'getInfo',
				description: 'Get account info',
				action: 'Get account info',
			},
		],
		default: 'getInfo',
	},
	...getInfo.description,
];
