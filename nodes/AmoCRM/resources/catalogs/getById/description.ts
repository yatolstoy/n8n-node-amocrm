import { IDisplayOptions } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['getById'],
	},
};

export const description: IContactsProperties = [
	{
		displayName: 'Catalog',
		name: 'catalog_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		required: true,
		displayOptions,
	},
];
