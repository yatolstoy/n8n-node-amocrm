import { INodeProperties } from 'n8n-workflow';

import * as getList from './getList';
import * as create from './create';
import * as update from './update';
export { getList, create, update };

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
			{
				name: 'Create',
				value: 'create',
				description: 'Create new leads',
				action: 'Create new leads',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update leads',
				action: 'Update leads',
			},
		],
		default: 'getList',
	},
	...getList.description,
	...create.description,
	...update.description,
];
