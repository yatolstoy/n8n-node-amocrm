import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ICompaniesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeCompanyModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['companies'],
		operation: ['createCompany'],
	},
};

export const createCompanyModel: INodeProperties[] = [
	...makeCompanyModelDescription().filter((el) => el.name !== 'id'),
	addRequestId(),
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
