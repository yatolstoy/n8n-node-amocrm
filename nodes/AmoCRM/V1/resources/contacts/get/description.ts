import { IDisplayOptions } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';
import { addWithDescription } from '../../_components/WithDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['contacts'],
		operation: ['getContacts'],
	},
};

export const description: IContactsProperties = [
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
			displayName: 'List of Contact IDs',
			name: 'id',
			type: 'string',
			default: '',
			description: 'Contact IDs separated by commas',
		},
		{
			displayName: 'Contact Name',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Just one name of contact',
		},
		{
			displayName: 'Created by Users',
			name: 'created_by',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description:
				'Select users. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			noDataExpression: true,
		},
		{
			displayName: 'Updated by Users',
			name: 'updated_by',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description:
				'Select users. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			noDataExpression: true,
		},
		{
			displayName: 'Responsible User Names',
			name: 'responsible_user_id',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description:
				'Select users. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			noDataExpression: true,
		},
		addDateRangeDescription('Created at', 'created_at'),
		addDateRangeDescription('Updated at', 'updated_at'),
		addDateRangeDescription('Closest task at', 'closest_task_at'),
	]),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: { sortSettings: { sort_by: 'created_at', sort_order: 'asc' } },
		displayOptions,
		options: [
			addSortDescription(undefined, [
				{
					name: 'Date Update',
					value: 'updated_at',
				},
				{
					name: 'ID',
					value: 'id',
				},
			]),
			addWithDescription(undefined, [
				{
					name: 'Deal-Related Catalog Elements',
					value: 'catalog_elements',
				},
				{
					name: 'Leads',
					value: 'leads',
				},
				{
					name: 'Customers',
					value: 'customers',
				},
			]),
		],
	},
	addPageDescription({
		show: {
			...displayOptions.show,
			returnAll: [false],
		},
	}),
	addLimitDescription(displayOptions),
];
