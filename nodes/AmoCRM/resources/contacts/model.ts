import { INodeProperties, INodePropertyCollection, INodePropertyOptions } from 'n8n-workflow';
import { addCustomFieldDescription } from '../_components/CustomFieldsDescription';

const modelDescription: INodeProperties[] = [
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
];

export const makeContactModelDescription = (
	embeddedOptions?: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
) => {
	const model: INodeProperties[] = [
		...modelDescription,
		addCustomFieldDescription('getCustomFields'),
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
	model.push(embedded);

	return model;
};
