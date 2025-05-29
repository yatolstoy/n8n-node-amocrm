import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { catalogElementModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['addCatalogElements'],
	},
};

export const createCatalogModel: INodeProperties[] = [
	...catalogElementModelDescription.filter((el) => el.name !== 'id'),
	addRequestId(),
];

export const description: ICatalogsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalog Name or ID',
		name: 'catalog_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		default: '',
		required: true,
		description:
			'Select catalog. Choose from the catalog, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions,
	},
	{
		displayName: 'Catalog Elements',
		name: 'collection',
		placeholder: 'Add element',
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
			hide: {
				catalog_id: [''],
			},
		},
		options: [
			{
				displayName: 'Create Element',
				name: 'element',
				values: createCatalogModel,
			},
		],
	},
];
