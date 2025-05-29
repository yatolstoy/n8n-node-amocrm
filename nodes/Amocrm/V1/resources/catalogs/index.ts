import { INodeProperties } from 'n8n-workflow';

import * as getCatalogs from './get';
import * as addCatalogs from './create';
import * as updateCatalogs from './update';
import * as getCatalogElements from './getElements';
import * as addCatalogElements from './createElement';
import * as updateCatalogElements from './updateElements';

export {
	getCatalogs,
	getCatalogElements,
	addCatalogs,
	addCatalogElements,
	updateCatalogs,
	updateCatalogElements,
};

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
				name: 'Create Catalog Elements',
				value: 'addCatalogElements',
				action: 'Add multiple catalog elements into the account',
				description: 'Add multiple catalog elements into the account',
			},
			{
				name: 'Create Catalogs',
				value: 'addCatalogs',
				description: 'Add multiple catalogs',
				action: 'Add multiple catalogs',
			},
			{
				name: 'Editing Catalog Elements',
				value: 'updateCatalogElements',
				action: 'Editing multiple catalog elements',
				description: 'Editing multiple catalog elements',
			},
			{
				name: 'Editing Catalogs',
				value: 'updateCatalogs',
				action: 'Editing multiple catalogs',
				description: 'Editing multiple catalogs',
			},
			{
				name: 'Get Catalog Elements',
				value: 'getCatalogElements',
				action: 'Get available catalog elements on the account',
				description: 'Get available catalog elements on the account',
			},
			{
				name: 'Get Catalogs',
				value: 'getCatalogs',
				description: 'Get all account catalogs',
				action: 'Get available catalogs',
			},
		],
		default: 'getCatalogs',
	},
	...getCatalogs.description,
	...addCatalogs.description,
	...updateCatalogs.description,
	...getCatalogElements.description,
	...addCatalogElements.description,
	...updateCatalogElements.description,
];
