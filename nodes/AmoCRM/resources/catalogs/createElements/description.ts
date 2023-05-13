import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCatalogElementModelDescription } from '../model';
import { addCatalogSelector } from '../../_components/CatalogSelector';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['createElements'],
	},
};

export const description: ICatalogsProperties = [
	addCatalogSelector(displayOptions),
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalog elements',
		name: 'collection',
		placeholder: 'Add element',
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
				displayName: 'Element',
				name: 'element',
				values: makeCatalogElementModelDescription(),
			},
		],
	},
];
