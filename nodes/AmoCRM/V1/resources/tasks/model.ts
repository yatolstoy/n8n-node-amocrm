import { INodeProperties } from 'n8n-workflow';

export const taskModelDescription: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Complete Till',
		name: 'complete_till',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Responsible User Name or ID',
		name: 'responsible_user_id',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
		displayName: 'Entity ID',
		name: 'entity_id',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Task Type Names or Name or ID',
		name: 'task_type_id',
		type: 'options',
		description:
			'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getTaskTypes',
		},
	},
	{
		displayName: 'Duration In Seconds',
		name: 'duration',
		type: 'number',
		default: undefined,
	},
	{
		displayName: 'Is Completed',
		name: 'is_completed',
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Result Text',
		name: 'resultText',
		type: 'string',
		default: undefined,
	},
	{
		displayName: 'Created By User Name or ID',
		name: 'created_by',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Updated By User Name or ID',
		name: 'updated_by',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Created At',
		name: 'created_at',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Updated At',
		name: 'updated_at',
		type: 'dateTime',
		default: undefined,
	},
];
