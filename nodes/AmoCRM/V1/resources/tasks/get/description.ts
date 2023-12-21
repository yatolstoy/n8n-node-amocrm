import { IDisplayOptions } from 'n8n-workflow';
import { ITasksProperties } from '../../interfaces';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['tasks'],
		operation: ['getTasks'],
	},
};

export const description: ITasksProperties = [
	addReturnAll(displayOptions),
	addFilterDescription(displayOptions, [
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
		},
		{
			displayName: 'Is Completed',
			name: 'is_completed',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Task Type Names or IDs',
			name: 'task_type',
			type: 'multiOptions',
			description:
				'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getTaskTypes',
			},
		},
		{
			displayName: 'Entity Type',
			name: 'entity_type',
			type: 'options',
			default: 'leads',
			options: [
				{
					name: 'Leads',
					value: 'leads',
				},
				{
					name: 'Contacts',
					value: 'contacts',
				},
				{ name: 'Companies', value: 'companies' },
				{ name: 'Customers', value: 'customers' },
			],
		},
		{
			displayName: 'Entity IDs',
			name: 'entity_id',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Task IDs',
			name: 'id',
			type: 'string',
			default: '',
		},
		addDateRangeDescription('Updated at', 'updated_at'),
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
					name: 'Complete Till',
					value: 'complete_till',
				},
				{
					name: 'ID',
					value: 'id',
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
