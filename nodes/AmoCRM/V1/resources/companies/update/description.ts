import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICompaniesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCompanyModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['companies'],
		operation: ['updateCompany'],
	},
};

const updateCompanyModel: INodeProperties[] = [...makeCompanyModelDescription(), addRequestId()];

export const description: ICompaniesProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Companies',
		name: 'collection',
		placeholder: 'Edit company',
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
				values: updateCompanyModel,
			},
		],
	},
];
