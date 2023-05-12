import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { addStatusColor } from '../_components/StatusColor';

export const statusModelDescription = (
	displayOptions?: IDisplayOptions,
): Array<INodeProperties> => [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: undefined,
		displayOptions,
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'number',
		default: 1,
		displayOptions,
	},
	addStatusColor(displayOptions),
	{
		displayName: 'Descriptions',
		name: 'collection',
		placeholder: 'Add description',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				values: [
					{
						displayName: 'Level',
						name: 'level',
						type: 'options',
						default: 'newbie',
						required: true,
						options: [
							{ name: 'Newbie', value: 'newbie' },
							{ name: 'Candidate', value: 'candidate' },
							{ name: 'Master', value: 'master' },
						],
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
		displayOptions,
	},
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
		displayOptions,
	},
];
