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
		displayName: 'Responsible User Name or ID',
		name: 'responsible_user_id',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'Created by User Name or ID',
		name: 'created_by',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'Updated by User Name or ID',
		name: 'updated_by',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
		noDataExpression: true,
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

export const makeCompanyModelDescription = (
	embeddedOptions?: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
) => {
	const model: INodeProperties[] = [
		...modelDescription,
		addCustomFieldDescription('getCompanyCustomFields'),
	];

	// add embedded
	const options = embeddedOptions ? [...embeddedOptions] : [];
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
	model.push(embedded);

	return model;
};
