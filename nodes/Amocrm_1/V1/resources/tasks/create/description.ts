import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ITasksProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { taskModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['tasks'],
		operation: ['createTasks'],
	},
};

export const createTaskModel: INodeProperties[] = [
	...taskModelDescription.filter((el) => el.name !== 'id'),
];

export const description: ITasksProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Tasks',
		name: 'collection',
		placeholder: 'Add task',
		type: 'fixedCollection',
		default: [],
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...displayOptions.show,
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Create Task',
				name: 'task',
				values: createTaskModel,
			},
		],
	},
];
