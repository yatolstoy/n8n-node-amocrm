import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { catalogModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['addCatalogs'],
	},
};

export const createCatalogModel: INodeProperties[] = [
	...catalogModelDescription.filter((el) => el.name !== 'id'),
	addRequestId(),
];

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalogs',
		name: 'collection',
		placeholder: 'Add catalog',
		type: 'fixedCollection',
		default: [],
		required: true,
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
				displayName: 'Create Catalog',
				name: 'catalog',
				values: createCatalogModel,
			},
		],
	},
];
