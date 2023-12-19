import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as create from './create';
import * as update from './update';
import * as remove from './delete';

export { get, create, update, remove };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statuses'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get statuses',
				action: 'Get statuses',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create statuses',
				action: 'Create statuses',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update statuses',
				action: 'Update statuses',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete statuses',
				action: 'Delete statuses',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...update.description,
	...remove.description,
];
