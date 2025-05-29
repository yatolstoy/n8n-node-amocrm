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
				name: 'Chat Service Account ID',
				value: 'amojo_id',
			},
			{
				name: 'User Rights in Chats',
				value: 'amojo_rights',
			},
			{
				name: 'Users Groups',
				value: 'users_groups',
			},
			{
				name: 'Task Types',
				value: 'task_types',
			},
			{
				name: 'Version',
				value: 'version',
			},
			{
				name: 'Entity Names',
				value: 'entity_names',
			},
			{
				name: 'Datetime Settings',
				value: 'datetime_settings',
			},
			{
				name: 'Drive Url',
				value: 'drive_url',
			},
			{
				name: 'Is API Filter Enabled',
				value: 'is_api_filter_enabled',
			},
		],
	),
];
