import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { catalogModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';
import { ICatalogsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['updateCatalogs'],
	},
};

const updateCatalogModel: INodeProperties[] = [
	...catalogModelDescription.filter((el) =>
		['id', 'name', 'can_add_elements', 'can_link_multiple'].includes(el.name),
	),
	addRequestId(),
];

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalogs',
		name: 'collection',
		placeholder: 'Add edited catalog',
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
				displayName: 'Update Catalogs',
				name: 'catalog',
				values: updateCatalogModel,
			},
		],
	},
];
