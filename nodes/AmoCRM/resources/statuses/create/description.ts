import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { IPipelinesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { statusModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['statuses'],
		operation: ['create'],
	},
};

export const description: IPipelinesProperties = [
	{
		displayName: 'Pipeline',
		name: 'pipeline_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		required: true,
		displayOptions,
	},
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Statuses',
		name: 'collection',
		placeholder: 'Add status',
		type: 'fixedCollection',
		default: [],
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
				displayName: 'Statuses',
				name: 'statuses',
				values: statusModelDescription(),
			},
		],
	},
];
