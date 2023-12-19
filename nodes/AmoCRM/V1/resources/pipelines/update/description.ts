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
		displayOptions: { show: displayOptions.show, hide: { json: [true] } },
	},
	...pipelineModelDescription({ show: displayOptions.show, hide: { json: [true] } }),
];

export const description: ILeadsProperties = [...updateLeadModel];
