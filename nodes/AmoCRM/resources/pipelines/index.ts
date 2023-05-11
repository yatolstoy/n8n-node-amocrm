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
				resource: ['pipelines'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get pipelines',
				action: 'Get pipelines',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create pipelines',
				action: 'Create pipelines',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update pipeline',
				action: 'Update pipeline',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete pipeline',
				action: 'Delete pipeline',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...update.description,
	...remove.description,
];
