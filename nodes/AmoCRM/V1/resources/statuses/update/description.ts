import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { statusModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['statuses'],
		operation: ['update'],
	},
};

const updateLeadModel: INodeProperties[] = [
	{
		displayName: 'Status Name or ID',
		name: 'status_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		required: true,
		displayOptions,
	},
	...addJsonParametersDescription(displayOptions),
	...statusModelDescription({ show: displayOptions.show, hide: { json: [true] } }),
];

export const description: ILeadsProperties = [...updateLeadModel];
