import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCatalogModelDescription } from '../model';
import { addCatalogSelector } from '../../_components/CatalogSelector';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['update'],
	},
};

const updateCatalogModel: INodeProperties[] = [
	addCatalogSelector(),
	...makeCatalogModelDescription(),
	// addRequestId(),
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
