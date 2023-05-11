import { IDisplayOptions } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['pipelines'],
		operation: ['delete'],
	},
};

export const description: ILeadsProperties = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions,
	},
];
