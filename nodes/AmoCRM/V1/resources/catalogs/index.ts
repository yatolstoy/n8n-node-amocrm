import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as getElements from './getElements';
import * as getById from './getById';
import * as create from './create';
import * as createElements from './createElements';
import * as update from './update';
import * as updateElements from './updateElements';

export { get, getById, getElements, create, createElements, update, updateElements };

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
				name: 'Create Catalog',
				value: 'create',
				description: 'Create new catalog',
				action: 'Create new catalog',
			},
			{
				name: 'Create Elements',
				value: 'createElements',
				description: 'Create new elements of catalog',
				action: 'Create new elements of catalog',
			},
			{
				name: 'Get Catalog by ID',
				value: 'getById',
				action: 'Get catalog by id',
			},
			{
				name: 'Get Catalogs',
				value: 'get',
				description: 'Get list of catalogs',
				action: 'Get list of catalogs',
			},
			{
				name: 'Get Elements of Catalog',
				value: 'getElements',
				description: 'Get elements of list of catalogs',
				action: 'Get elements of list of catalogs',
			},
			{
				name: 'Update Catalog',
				value: 'update',
				action: 'Update catalog',
			},
			{
				name: 'Update Elements',
				value: 'updateElements',
				description: 'Update elements of catalog',
				action: 'Update elements of catalog',
			},
		],
		default: 'get',
	},
	...get.description,
	...getById.description,
	...getElements.description,
	...create.description,
	...createElements.description,
	...update.description,
	...updateElements.description,
];
