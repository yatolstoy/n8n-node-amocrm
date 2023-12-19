import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as create from './create';
import * as update from './update';
export { get, create, update };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['companies'],
			},
		},
		options: [
			{
				name: 'Get Companies List',
				value: 'get',
				description: 'Get list of companies',
				action: 'Get list of companies',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create new companies',
				action: 'Create new companies',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update companies',
				action: 'Update companies',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...update.description,
];
