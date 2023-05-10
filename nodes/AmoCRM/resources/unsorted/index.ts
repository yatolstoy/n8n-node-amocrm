import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as create from './create';
import * as accept from './accept';
import * as reject from './reject';
import * as link from './link';
import * as summary from './summary';

export { get, create, accept, reject, link, summary };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['unsorted'],
			},
		},
		options: [
			{
				name: 'Get list',
				value: 'get',
				description: 'Get unsorted',
				action: 'Get unsorted',
			},
			{
				name: 'Get summary',
				value: 'summary',
				description: 'Get summary about unsorted',
				action: 'Get summary unsorted',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create unsorted',
				action: 'Create unsorted',
			},
			{
				name: 'Accept',
				value: 'accept',
				description: 'Accept unsorted',
				action: 'Accept unsorted',
			},
			{
				name: 'Reject',
				value: 'reject',
				description: 'Reject unsorted',
				action: 'Reject unsorted',
			},
			{
				name: 'Link',
				value: 'link',
				description: 'Link unsorted',
				action: 'Link unsorted',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...accept.description,
	...reject.description,
	...link.description,
	...summary.description,
];
