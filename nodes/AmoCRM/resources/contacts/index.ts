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
				resource: ['contacts'],
			},
		},
		options: [
			{
				name: 'Get contacts list',
				value: 'get',
				description: 'Get list of contacts',
				action: 'Get list of contacts',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create new contacts',
				action: 'Create new contacts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update contacts',
				action: 'Update contacts',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...update.description,
];
