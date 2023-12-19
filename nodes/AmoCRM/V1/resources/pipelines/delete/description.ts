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
		displayName: 'Pipeline Name or ID',
		name: 'id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		required: true,
		displayOptions,
	},
];
