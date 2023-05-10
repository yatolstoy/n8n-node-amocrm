import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICompaniesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCompanyModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['companies'],
		operation: ['create'],
	},
};

export const createCompanyModel: INodeProperties[] = [
	...makeCompanyModelDescription(),
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
	},
];

export const description: ICompaniesProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Companies',
		name: 'collection',
		placeholder: 'Add Company',
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
				displayName: 'Company',
				name: 'company',
				values: createCompanyModel,
			},
		],
	},
];
