import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCatalogElementModelDescription } from '../model';
import { addCatalogSelector } from '../../_components/CatalogSelector';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['updateElements'],
	},
};

const updateCatalogElementModel: INodeProperties[] = [
	{
		displayName: 'Element Name or ID',
		name: 'element_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getCatalogElements',
		},
		required: true,
	},
	...makeCatalogElementModelDescription(),
	addRequestId(),
];

export const description: ICatalogsProperties = [
	addCatalogSelector(displayOptions),
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Catalog Elements',
		name: 'collection',
		placeholder: 'Edit catalog elements',
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
				displayName: 'Catalog Element',
				name: 'catalogElement',
				values: updateCatalogElementModel,
			},
		],
	},
];
