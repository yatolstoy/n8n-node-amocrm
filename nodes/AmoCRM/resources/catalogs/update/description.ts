import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCatalogModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['update'],
	},
};

const updateCatalogModel: INodeProperties[] = [
	{
		displayName: 'Catalog',
		name: 'catalog_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		required: true,
	},
	...makeCatalogModelDescription(),
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
	},
];

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalogs',
		name: 'collection',
		placeholder: 'Edit catalog',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...displayOptions.show,
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Catalog',
				name: 'catalog',
				values: updateCatalogModel,
			},
		],
	},
];
