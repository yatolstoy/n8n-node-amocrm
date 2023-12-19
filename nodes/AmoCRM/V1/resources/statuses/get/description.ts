import { IDisplayOptions } from 'n8n-workflow';
import { IStatusesProperties } from '../../interfaces';
import { addWithDescription } from '../../_components/WithDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['statuses'],
		operation: ['get'],
	},
};
export const description: IStatusesProperties = [
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
	addWithDescription(displayOptions, [
		{
			name: 'Descriptions',
			value: 'descriptions',
		},
	]),
];
