import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { ILeadsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeLeadModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['leads'],
		operation: ['createLeads'],
	},
};

export const createLeadModel: INodeProperties[] = [
	...makeLeadModelDescription([
		{
			displayName: 'Contacts',
			name: 'contacts',
			values: [
				{
					displayName: 'Contacts',
					name: 'id',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: [],
					required: true,
					placeholder: 'Add contact',
					options: [
						{
							displayName: 'Contact',
							name: 'contact',
							values: [
								{
									displayName: 'ID',
									name: 'id',
									type: 'number',
									default: '',
								},
								{
									displayName: 'Is Main',
									name: 'is_main',
									type: 'boolean',
									default: true,
								},
							],
						},
					],
				},
			],
		},
		{
			displayName: 'Companies',
			name: 'companies',
			values: [
				{
					displayName: 'Companies',
					name: 'id',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: [],
					required: true,
					placeholder: 'Add company',
					options: [
						{
							displayName: 'Company',
							name: 'company',
							values: [
								{
									displayName: 'ID',
									name: 'id',
									type: 'number',
									default: '',
								},
							],
						},
					],
				},
			],
		},
	]),
];

export const description: ILeadsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Leads',
		name: 'collection',
		placeholder: 'Add lead',
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
				values: createLeadModel,
			},
		],
	},
];
