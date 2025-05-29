import { INodeProperties } from 'n8n-workflow';

import * as getContacts from './get';
import * as createContacts from './create';
import * as updateContacts from './update';
export { getContacts, createContacts, updateContacts };

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
				name: 'Get Contacts List',
				value: 'getContacts',
				description: 'Get list of contacts',
				action: 'Get list of contacts',
			},
			{
				name: 'Create Contacts',
				value: 'createContacts',
				description: 'Create new contacts',
				action: 'Create new contacts',
			},
			{
				name: 'Update Contacts',
				value: 'updateContacts',
				description: 'Update contacts by ID',
				action: 'Update contacts',
			},
		],
		default: 'getContacts',
	},
	...getContacts.description,
	...createContacts.description,
	...updateContacts.description,
];
