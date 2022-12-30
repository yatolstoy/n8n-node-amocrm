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
		displayName: 'Pipeline',
		name: 'pipeline_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		noDataExpression: true,
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		noDataExpression: true,
	},
	{
		displayName: 'Created by user',
		name: 'created_by',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: true,
	},
	{
		displayName: 'Updated by user',
		name: 'updated_by',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: true,
	},
	{
		displayName: 'Responsible user',
		name: 'responsible_user_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: true,
	},
	{
		displayName: 'Closed at',
		name: 'closed_at',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Created at',
		name: 'created_at',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Updated at',
		name: 'updated_at',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Loss reason',
		name: 'loss_reason_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getLossReasons',
		},
		noDataExpression: true,
	},
	addCustomFieldDescription('getLeadsCustomFields'),
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
						displayName: 'Tag',
						name: 'id',
						type: 'multiOptions',
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
