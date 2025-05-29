import { INodeProperties } from 'n8n-workflow';

import * as getCompany from './get';
import * as createCompany from './create';
import * as updateCompany from './update';
export { getCompany, createCompany, updateCompany };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['companies'],
			},
		},
		options: [
			{
				name: 'Get Companies List',
				value: 'getCompany',
				description: 'Get list of companies',
				action: 'Get list of companies',
			},
			{
				name: 'Create',
				value: 'createCompany',
				description: 'Create new companies',
				action: 'Create new companies',
			},
			{
				name: 'Update',
				value: 'updateCompany',
				description: 'Update companies',
				action: 'Update companies',
			},
		],
		default: 'getCompany',
	},
	...getCompany.description,
	...createCompany.description,
	...updateCompany.description,
];
