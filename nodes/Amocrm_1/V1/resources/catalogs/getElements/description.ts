import { IDisplayOptions } from 'n8n-workflow';
import { ICatalogsProperties } from '../../interfaces';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addFilterDescription } from '../../_components/FilterDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['getCatalogElements'],
	},
};

export const description: ICatalogsProperties = [
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
			'Select catalog. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		displayOptions,
	},
	addReturnAll(displayOptions),
	addFilterDescription(displayOptions, [
		{
			displayName: 'Query',
			name: 'query',
			type: 'string',
			default: '',
			description: 'Search query',
		},
		{
			displayName: 'Catalog of Element IDs',
			name: 'id',
			type: 'string',
			default: '',
			description: 'Element IDs separated by commas',
		},
	]),
	addPageDescription({
		show: {
			...displayOptions.show,
			returnAll: [false],
		},
	}),
	addLimitDescription(displayOptions),
];
