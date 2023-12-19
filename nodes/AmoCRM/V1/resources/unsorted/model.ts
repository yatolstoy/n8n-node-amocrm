import { INodeProperties } from 'n8n-workflow';
import { createCompanyModel } from '../companies/create/description';
import { createContactModel } from '../contacts/create/description';
import { createLeadModel } from '../leads/create/description';

const modelDescription: INodeProperties[] = [
	{
		displayName: 'UID Source Unsorted',
		name: 'source_uid',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: 'Name Source Unsorted',
		name: 'source_name',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: 'Pipeline Name or ID',
		name: 'pipeline_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		noDataExpression: true,
		required: true,
	},
	{
		displayName: 'Created At',
		name: 'created_at',
		type: 'dateTime',
		default: undefined,
		required: true,
	},
];

export const makeUnsortedModelDescription = (metadataFields?: INodeProperties[]) => {
	const model: INodeProperties[] = [...modelDescription];

	if (metadataFields && metadataFields.length) {
		model.push({
			displayName: 'Metadata',
			name: 'metadata',
			placeholder: 'Add metadata',
			type: 'fixedCollection',
			default: {},
			options: [
				{
					displayName: 'Metadata',
					name: 'metadata',
					values: metadataFields,
				},
			],
		});
	}

	model.push({
		displayName: 'Embedded',
		name: '_embedded',
		placeholder: 'Add custom embedded',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Contacts',
				name: 'contacts',
				values: createContactModel,
			},
			{
				displayName: 'Companies',
				name: 'companies',
				values: createCompanyModel,
			},
			{
				displayName: 'Leads',
				name: 'leads',
				values: createLeadModel,
			},
		],
	});

	return model;
};
