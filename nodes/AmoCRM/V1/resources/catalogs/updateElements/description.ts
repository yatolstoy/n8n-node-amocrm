import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { catalogElementModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';
import { ICatalogsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['updateCatalogElements'],
	},
};

const updateCatalogElementModel: INodeProperties[] = [
	...catalogElementModelDescription,
	addRequestId(),
];

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'List Name or ID',
		name: 'catalog_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		default: '',
		required: true,
		description:
			'Select catalog. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions,
	},
	{
		displayName: 'Catalog Elements',
		name: 'collection',
		placeholder: 'Add edited catalog elements',
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
				displayName: 'Update Catalog Elements',
				name: 'element',
				values: updateCatalogElementModel,
			},
		],
	},
];
