import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as getById from './getById';
import * as create from './create';
import * as update from './update';

export { get, getById, create, update };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['catalogs'],
			},
		},
		options: [
			{
				name: 'Get catalogs',
				value: 'get',
				description: 'Get list of catalogs',
				action: 'Get list of catalogs',
			},
			{
				name: 'Get catalog by ID',
				value: 'getById',
				description: 'Get catalog by Id',
				action: 'Get catalog by Id',
			},
			{
				name: 'Create catalog',
				value: 'create',
				description: 'Create new catalog',
				action: 'Create new catalog',
			},
			{
				name: 'Update catalog',
				value: 'update',
				description: 'Update catalog',
				action: 'Update catalog',
			},
			{
				name: 'Get elements of catalog',
				value: 'getElements',
				description: 'Get elements of list of catalogs',
				action: 'Get elements of list of catalogs',
			},
			{
				name: 'Create elements',
				value: 'createElements',
				description: 'Create new elements of catalog',
				action: 'Create new elements of catalog',
			},
			{
				name: 'Update elements',
				value: 'updateElements',
				description: 'Update elements of catalog',
				action: 'Update elements of catalog',
			},
		],
		default: 'get',
	},
	...get.description,
	...getById.description,
	...create.description,
	...update.description,
];
