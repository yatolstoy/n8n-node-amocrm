import { IDisplayOptions } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addWithDescription } from '../../_components/WithDescription';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addCatalogSelector } from '../../_components/CatalogSelector';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['getElements'],
	},
};

export const description: IContactsProperties = [
	addCatalogSelector(displayOptions),
	addFilterDescription(displayOptions, [
		{
			displayName: 'Query',
			name: 'query',
			type: 'string',
			default: '',
			description: 'Search query',
		},
		{
			displayName: 'IDs',
			name: 'ids',
			type: 'collection',
			placeholder: 'Add ID',
			default: [],
			options: [{ displayName: 'ID', name: 'id', type: 'number', default: 0 }],
		},
	]),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions,
		options: [
			addWithDescription(undefined, [
				{
					name: 'Invoice Link',
					value: 'invoice_link',
				},
			]),
		],
	},
	addPageDescription(displayOptions),
	addLimitDescription(displayOptions),
];
