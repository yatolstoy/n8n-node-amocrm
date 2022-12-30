import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { IContactsProperties, ILeadsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeContactModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['contacts'],
		operation: ['update'],
	},
};

const updateContactModel: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		default: undefined,
		required: true,
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: undefined,
	},
	...makeContactModelDescription(),
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
	},
];

export const description: IContactsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Contacts',
		name: 'collection',
		placeholder: 'Edit contact',
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
				displayName: 'Contact',
				name: 'contact',
				values: updateContactModel,
			},
		],
	},
];
