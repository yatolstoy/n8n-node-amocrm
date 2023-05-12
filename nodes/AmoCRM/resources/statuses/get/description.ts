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
		displayName: 'Pipeline',
		name: 'id',
		type: 'options',
		default: [],
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
