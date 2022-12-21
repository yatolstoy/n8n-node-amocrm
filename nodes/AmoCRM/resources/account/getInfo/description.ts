import { IAccountProperties } from '../../interfaces';

export const accountGetInfoDescription: IAccountProperties = [
	{
		displayName: 'Added information',
		name: 'additionalFields',
		type: 'multiOptions',
		placeholder: 'Add Field',
		default: [],
		description: 'Select the information to be added to the response',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getInfo'],
			},
		},
		options: [
			{
				name: 'Chat service account ID',
				value: 'amojo_id',
			},
			{
				name: 'User rights in chats',
				value: 'amojo_rights',
			},
			{
				name: 'Users groups',
				value: 'users_groups',
			},
			{
				name: 'Task types',
				value: 'task_types',
			},
			{
				name: 'Version',
				value: 'version',
			},
			{
				name: 'Entity names',
				value: 'entity_names',
			},
			{
				name: 'Datetime settings',
				value: 'datetime_settings',
			},
		],
	},
];
