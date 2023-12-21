import { INodeProperties } from 'n8n-workflow';

import * as getTasks from './get';
import * as createTasks from './create';
import * as updateTasks from './update';
export { getTasks, createTasks, updateTasks };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tasks'],
			},
		},
		options: [
			{
				name: 'Get Task List',
				value: 'getTasks',
				description: 'Get list of tasks',
				action: 'Get list of tasks',
			},
			{
				name: 'Create Tasks',
				value: 'createTasks',
				description: 'Create new tasks',
				action: 'Create new tasks',
			},
			{
				name: 'Update Tasks',
				value: 'updateTasks',
				action: 'Update tasks',
				description: 'Update tasks by ID',
			},
		],
		default: 'getTasks',
	},
	...getTasks.description,
	...updateTasks.description,
	...createTasks.description,
];
