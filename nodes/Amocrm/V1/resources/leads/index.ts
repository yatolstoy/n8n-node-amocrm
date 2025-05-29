import { INodeProperties } from 'n8n-workflow';

import * as getLeads from './get';
import * as createLeads from './create';
import * as updateLeads from './update';
export { getLeads, createLeads, updateLeads };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leads'],
			},
		},
		options: [
			{
				name: 'Get Lead List',
				value: 'getLeads',
				description: 'Get list of leads',
				action: 'Get list of leads',
			},
			{
				name: 'Create Leads',
				value: 'createLeads',
				description: 'Create new leads',
				action: 'Create new leads',
			},
			{
				name: 'Update Leads',
				value: 'updateLeads',
				action: 'Update leads',
				description: 'Update leads by ID',
			},
		],
		default: 'getLeads',
	},
	...getLeads.description,
	...createLeads.description,
	...updateLeads.description,
];
