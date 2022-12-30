import { IUnsortedProperties } from '../../../interfaces';
import { addJsonParametersDescription } from '../../../_components/JsonParametersDescription';

export const description: IUnsortedProperties = [
	...addJsonParametersDescription({
		show: {
			resource: ['unsorted'],
			operation: ['createFromCall'],
		},
	}),
	{
		displayName: 'Unsorted',
		name: 'collection',
		placeholder: 'Add unsorted',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['unsorted'],
				operation: ['createFromCall'],
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Unsorted',
				name: 'unsorted',
				values: [
					{
						displayName: 'UID source unsorted',
						name: 'source_uid',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Name source unsorted',
						name: 'source_name',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Pipeline',
						name: 'pipeline_id',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getPipelines',
						},
						noDataExpression: true,
					},
					{
						displayName: 'Created at',
						name: 'created_at',
						type: 'dateTime',
						default: undefined,
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'collection',
						placeholder: 'Add metadata',
						default: {},
						options: [
							{
								displayName: 'From',
								name: 'from',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Phone',
								name: 'phone',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Called at',
								name: 'called_at',
								type: 'dateTime',
								default: '',
							},
							{
								displayName: 'Duration',
								name: 'duration',
								type: 'number',
								default: 0,
							},
							{
								displayName: 'Link',
								name: 'link',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Service code',
								name: 'service_code',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Add call event',
								name: 'is_call_event_needed',
								type: 'boolean',
								default: true,
							},
						],
					},
				],
			},
		],
	},
];
