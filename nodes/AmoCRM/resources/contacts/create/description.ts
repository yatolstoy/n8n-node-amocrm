import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeContactModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['contacts'],
		operation: ['create'],
	},
};

const createContactModel: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: undefined,
	},
	{
		displayName: 'First name',
		name: 'first_name',
		type: 'string',
		default: undefined,
	},
	{
		displayName: 'Last name',
		name: 'last_name',
		type: 'string',
		default: undefined,
	},
	...makeContactModelDescription(),
];

export const description: IContactsProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Contacts',
		name: 'collection',
		placeholder: 'Add contact',
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
				values: createContactModel,
			},
		],
	},
];