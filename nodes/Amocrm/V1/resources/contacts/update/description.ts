import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeContactModelDescription } from '../model';
import { addRequestId } from '../../_components/RequestId';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['contacts'],
		operation: ['updateContacts'],
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
	addRequestId(),
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
