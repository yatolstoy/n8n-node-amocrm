import { IUnsortedProperties } from '../../interfaces';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { IDisplayOptions } from 'n8n-workflow';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['accept'],
	},
};

export const description: IUnsortedProperties = [
	{
		name: 'uid',
		displayName: 'Unsorted ID',
		type: 'number',
		default: 0,
		required: true,
		description: 'Unsorted ID',
		displayOptions,
	},
	{
		displayName: 'Responsible user',
		name: 'user_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getActiveUsers',
		},
		description: 'Select user',
		noDataExpression: false,
		displayOptions,
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		noDataExpression: false,
		displayOptions,
	},
];
