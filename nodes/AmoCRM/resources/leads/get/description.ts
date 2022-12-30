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
		operation: ['get'],
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
			displayName: 'List of lead ids',
			name: 'id',
			type: 'string',
			default: '',
			description: 'Lead IDs separated by commas',
		},
		{
			displayName: 'List of names',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Names separated by commas',
		},
		addNumRangeDescription('Price', 'price'),
		{
			displayName: 'Pipelines',
			name: 'pipelines',
			type: 'multiOptions',
			default: [],
			description: 'Select pipelines',
			typeOptions: {
				loadOptionsMethod: 'getPipelines',
			},
			noDataExpression: true,
		},
		{
			displayName: 'Statuses',
			name: 'statuses',
			type: 'multiOptions',
			default: [],
			description: 'Select statuses',
			options: [],
			typeOptions: {
				loadOptionsMethod: 'getStatuses',
			},
			noDataExpression: true,
		},
		{
			displayName: 'Created by users',
			name: 'created_by',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description: 'Select users',
			noDataExpression: true,
		},
		{
			displayName: 'Updated by users',
			name: 'updated_by',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description: 'Select users',
			noDataExpression: true,
		},
		{
			displayName: 'Responsible users',
			name: 'responsible_user_id',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getActiveUsers',
			},
			description: 'Select users',
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
					name: 'Date create',
					value: 'created_at',
				},
				{
					name: 'Date update',
					value: 'updated_at',
				},
				{
					name: 'ID',
					value: 'id',
				},
			]),
			addWithDescription(undefined, [
				{
					name: 'Deal-related catalog elements',
					value: 'catalog_elements',
				},
				{
					name: 'Last modified by robot',
					value: 'is_price_modified_by_robot',
				},
				{
					name: 'Loss reason',
					value: 'loss_reason',
				},
				{
					name: 'Contacts',
					value: 'contacts',
				},
				{
					name: 'Only deleted',
					value: 'only_deleted',
				},
				{
					name: 'Source id',
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
