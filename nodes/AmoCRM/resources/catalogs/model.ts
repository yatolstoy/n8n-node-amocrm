import { INodeProperties, INodePropertyCollection, INodePropertyOptions } from 'n8n-workflow';

export const makeCatalogModelDescription = () => {
	const model: INodeProperties[] = [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: undefined,
			required: true,
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			default: 'regular',
			options: [
				{
					name: 'Regular',
					value: 'regular',
				},
				{
					name: 'Invoices',
					value: 'invoices',
				},
				{
					name: 'Products',
					value: 'products',
				},
			],
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'number',
			default: null,
		},
		{
			displayName: 'Can add elements',
			name: 'can_add_elements',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Can link multiple',
			name: 'can_link_multiple',
			type: 'boolean',
			default: false,
		},
	];

	return model;
};
