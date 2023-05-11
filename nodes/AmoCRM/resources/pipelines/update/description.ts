import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { pipelineModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['pipelines'],
		operation: ['update'],
	},
};

const updateLeadModel: INodeProperties[] = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: { show: displayOptions.show, hide: { json: [true] } },
	},
	...pipelineModelDescription({ show: displayOptions.show, hide: { json: [true] } }),
];

export const description: ILeadsProperties = [...updateLeadModel];
