import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeLeadModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['leads'],
		operation: ['update'],
	},
};

const updateLeadModel: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: undefined,
		required: true,
	},
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
	},
	...makeLeadModelDescription(),
];

export const description: ILeadsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Leads',
		name: 'collection',
		placeholder: 'Add edited lead',
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
				displayName: 'Lead',
				name: 'lead',
				values: updateLeadModel,
			},
		],
	},
];
