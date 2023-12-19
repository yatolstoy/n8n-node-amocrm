import { IDisplayOptions } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCatalogModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['create'],
	},
};

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalogs',
		name: 'collection',
		placeholder: 'Add catalog',
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
				values: makeCatalogModelDescription(),
			},
		],
	},
];
