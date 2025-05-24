import { INodeProperties, INodePropertyCollection, INodePropertyOptions } from 'n8n-workflow';
import { addCustomFieldDescription } from '../_components/CustomFieldsDescription';

const modelDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: undefined,
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		default: undefined,
	},
	{
		displayName: 'Pipeline Name or ID',
		name: 'pipeline_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		// noDataExpression: true,
	},
	{
		displayName: 'Status Name or ID',
		name: 'status_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getStatusesWithoutUnsorted',
		},
		// noDataExpression: true,
	},
	{
		displayName: 'Created by User Name or ID',
		name: 'created_by',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		// noDataExpression: true,
	},
	{
		displayName: 'Updated by User Name or ID',
		name: 'updated_by',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		// noDataExpression: true,
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
		// noDataExpression: true,
	},
	{
		displayName: 'Closed At',
		name: 'closed_at',
		type: 'dateTime',
		default: undefined,
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
	{
		displayName: 'Loss Reason Name or ID',
		name: 'loss_reason_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getLossReasons',
		},
		noDataExpression: false,
	},
	// {
	// 	displayName: 'Source Name or ID',
	// 	name: 'source',
	// 	type: 'options',
	// 	description:
	// 		'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	// 	default: '',
	// 	typeOptions: {
	// 		loadOptionsMethod: 'getSources',
	// 	},
	// },
	addCustomFieldDescription('getLeadCustomFields'),
];

export const makeLeadModelDescription = (
	embeddedOptions?: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
) => {
	const model: INodeProperties[] = [...modelDescription];
	const options = embeddedOptions ? [...embeddedOptions] : [];

	// make shared embedded
	const embedded: INodeProperties = {
		displayName: 'Embedded',
		name: '_embedded',
		placeholder: 'Add custom embedded',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Tags',
				name: 'tags',
				values: [
					{
						displayName: 'Tag Names or IDs',
						name: 'id',
						type: 'multiOptions',
						description:
							'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						typeOptions: {
							loadOptionsMethod: 'getTags',
						},
						default: [],
					},
				],
			},
			...options,
		],
	};

	// add embedded
	model.push(embedded);

	return model;
};
