import { IDisplayOptions } from 'n8n-workflow';
import { INotesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { entityType, getNotesDescription } from '../entity';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['notes'],
		operation: ['updateNotes'],
	},
};

export const description: INotesProperties = [
	...entityType(displayOptions),
	...addJsonParametersDescription(displayOptions),
	...getNotesDescription(displayOptions, [
		{
			displayName: 'ID',
			name: 'id',
			type: 'number',
			default: undefined,
			required: true,
		},
	]),
];
