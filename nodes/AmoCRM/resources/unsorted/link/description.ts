import { IUnsortedProperties } from '../../interfaces';
import { IDisplayOptions } from 'n8n-workflow';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['link'],
	},
};

export const description: IUnsortedProperties = [
	{
		name: 'uid',
		displayName: 'Unsorted ID',
		type: 'number',
		default: 0,
		required: true,
		description: 'Unsorted ID',
		displayOptions,
	},
	{
		displayName: 'User',
		name: 'user_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: false,
		displayOptions,
	},
	{
		displayName: 'Entity ID',
		name: 'link[entity_id]',
		type: 'number',
		default: 0,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Entity type',
		name: 'link_entity_type',
		type: 'options',
		default: 'leads',
		options: [
			{
				name: 'Leads',
				value: 'leads',
			},
			{
				name: 'Customers',
				value: 'customers',
			},
		],
		displayOptions,
	},
	{
		displayName: 'Contact Id',
		name: 'link[metadata][contact_id]',
		type: 'number',
		default: 0,
		displayOptions,
	},
];
