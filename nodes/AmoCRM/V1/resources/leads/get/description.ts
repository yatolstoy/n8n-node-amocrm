import { IDisplayOptions } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addNumRangeDescription } from '../../_components/NumRangeDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';
import { addWithDescription } from '../../_components/WithDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['leads'],
		operation: ['getLeads'],
	},
};

export const description: ILeadsProperties = [
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
			displayName: 'List of Lead IDs',
			name: 'id',
			type: 'string',
			default: '',
			description: 'Lead IDs separated by commas',
		},
		{
			displayName: 'List of Names',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Names separated by commas',
		},
		addNumRangeDescription('Price', 'price'),
		{
			displayName: 'Pipeline Names or IDs',
			name: 'pipelines',
			type: 'multiOptions',
			default: [],
			description:
				'Select pipelines. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			typeOptions: {
				loadOptionsMethod: 'getPipelines',
			},
			noDataExpression: true,
		},
		{
			displayName: 'Status Names or IDs',
			name: 'statuses',
			type: 'multiOptions',
			default: [],
			description:
				'Select statuses. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			options: [],
			typeOptions: {
				loadOptionsMethod: 'getStatuses',
			},
			noDataExpression: true,
		},
		{
			displayName: 'Created by Users',
			name: 'created_by',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsersWithRobot',
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
				loadOptionsMethod: 'getActiveUsersWithRobot',
			},
			description:
				'Select users. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			noDataExpression: true,
		},
		{
			displayName: 'Responsible User Names or IDs',
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
		addDateRangeDescription('Closed at', 'closed_at'),
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
					name: 'Date Create',
					value: 'created_at',
				},
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
					name: 'Last Modified by Robot',
					value: 'is_price_modified_by_robot',
				},
				{
					name: 'Loss Reason',
					value: 'loss_reason',
				},
				{
					name: 'Contacts',
					value: 'contacts',
				},
				{
					name: 'Only Deleted',
					value: 'only_deleted',
				},
				{
					name: 'Source ID',
					value: 'source_id',
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
