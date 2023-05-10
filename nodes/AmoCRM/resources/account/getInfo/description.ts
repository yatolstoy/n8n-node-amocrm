import { IAccountProperties } from '../../interfaces';
import { addWithDescription } from '../../_components/WithDescription';

export const description: IAccountProperties = [
	addWithDescription(
		{
			show: {
				resource: ['account'],
				operation: ['getInfo'],
			},
		},
		[
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
			{
				name: 'Drive url',
				value: 'drive_url',
			},
			{
				name: 'Is API filter enabled',
				value: 'is_api_filter_enabled',
			},
		],
	),
];
