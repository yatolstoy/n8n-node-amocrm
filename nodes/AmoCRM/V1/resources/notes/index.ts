import { INodeProperties } from 'n8n-workflow';

import * as getNotes from './get';
import * as createNotes from './create';
import * as updateNotes from './update';
export { getNotes, createNotes, updateNotes };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notes'],
			},
		},
		options: [
			{
				name: 'Get Notes List',
				value: 'getNotes',
				description: 'Get list of notes',
				action: 'Get list of notes',
			},
			{
				name: 'Create Notes',
				value: 'createNotes',
				description: 'Create new notes',
				action: 'Create new notes',
			},
			{
				name: 'Update Notes',
				value: 'updateNotes',
				action: 'Update notes',
				description: 'Update notes by ID',
			},
		],
		default: 'getNotes',
	},
	...getNotes.description,
	...createNotes.description,
	...updateNotes.description,
];
