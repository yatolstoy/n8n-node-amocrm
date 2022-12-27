import { ILeadsProperties } from '../../interfaces';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';
import { addWithDescription } from '../../_components/WithDescription';

export const description: ILeadsProperties = [
	addReturnAll({
		show: {
			resource: ['leads'],
			operation: ['getList'],
		},
	}),
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['getList'],
			},
		},
		options: [
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
			{
				displayName: 'Price',
				name: 'price',
				placeholder: 'Add Range',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Range',
						name: 'rangeCustom',
						values: [
							{
								displayName: 'From',
								name: 'from',
								type: 'number',
								required: true,
								default: '',
								description: 'Start number of the date range to filter results by',
							},
							{
								displayName: 'To',
								name: 'to',
								type: 'number',
								required: true,
								default: '',
								description: 'End number of the date range to filter results by',
							},
						],
					},
				],
			},
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
					loadOptionsMethod: 'getUsers',
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
					loadOptionsMethod: 'getUsers',
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
					loadOptionsMethod: 'getUsers',
				},
				description: 'Select users',
				noDataExpression: true,
			},
			{
				displayName: 'Created at',
				name: 'created_at',
				placeholder: 'Add Date Range',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Date Range Properties',
						name: 'dateRangeCustomProperties',
						values: [
							{
								displayName: 'From',
								name: 'from',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'Start date of the date range to filter results by',
							},
							{
								displayName: 'To',
								name: 'to',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'End date of the date range to filter results by',
							},
						],
					},
				],
			},
			{
				displayName: 'Updated at',
				name: 'updated_at',
				placeholder: 'Add Date Range',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Date Range Properties',
						name: 'dateRangeCustomProperties',
						values: [
							{
								displayName: 'From',
								name: 'from',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'Start date of the date range to filter results by',
							},
							{
								displayName: 'To',
								name: 'to',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'End date of the date range to filter results by',
							},
						],
					},
				],
			},
			{
				displayName: 'Closed at',
				name: 'closed_at',
				placeholder: 'Add Date Range',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Date Range Properties',
						name: 'dateRangeCustomProperties',
						values: [
							{
								displayName: 'From',
								name: 'from',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'Start date of the date range to filter results by',
							},
							{
								displayName: 'To',
								name: 'to',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'End date of the date range to filter results by',
							},
						],
					},
				],
			},
			{
				displayName: 'Closest task at',
				name: 'closest_task_at',
				placeholder: 'Add Date Range',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Date Range Properties',
						name: 'dateRangeCustomProperties',
						values: [
							{
								displayName: 'From',
								name: 'from',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'Start date of the date range to filter results by',
							},
							{
								displayName: 'To',
								name: 'to',
								type: 'dateTime',
								required: true,
								default: '',
								description: 'End date of the date range to filter results by',
							},
						],
					},
				],
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: { sortSettings: { sort_by: 'created_at', sort_order: 'asc' } },
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['getList'],
			},
		},
		options: [
			addSortDescription([
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
			resource: ['leads'],
			operation: ['getList'],
			returnAll: [false],
		},
	}),
	addLimitDescription({
		show: {
			operation: ['getList'],
			resource: ['leads'],
		},
	}),
];
