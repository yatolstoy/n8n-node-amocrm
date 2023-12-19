import { INodeProperties } from 'n8n-workflow';
import { addCustomFieldDescription } from '../_components/CustomFieldsDescription';

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
			displayName: 'Can Add Elements',
			name: 'can_add_elements',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Can Link Multiple',
			name: 'can_link_multiple',
			type: 'boolean',
			default: false,
		},
	];

	return model;
};

export const makeCatalogElementModelDescription = () => {
	const model: INodeProperties[] = [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: undefined,
			required: true,
		},
		addCustomFieldDescription('getCatalogCustomFields'),
		// addRequestId(),
	];

	return model;
};
