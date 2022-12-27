import { ILeadsProperties } from '../../interfaces';

export const description: ILeadsProperties = [
	{
		displayName: 'JSON Parameters',
		name: 'json',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['update'],
			},
		},
		default: false,
	},
	{
		displayName: 'Stringifyed array of objects',
		name: 'jsonString',
		type: 'string',
		default: '={{JSON.stringify([{id: 1; name: "example change"}])}}',
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['update'],
				json: [true],
			},
		},
	},
	{
		displayName: 'Leads',
		name: 'collection',
		placeholder: 'Edit lead',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['update'],
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Lead',
				name: 'lead',
				values: [
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
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: undefined,
					},
					{
						displayName: 'Status',
						name: 'status_id',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getStatuses',
						},
						noDataExpression: true,
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
						displayName: 'Created by user',
						name: 'created_by',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getUsers',
						},
						description: 'Select user',
						noDataExpression: true,
					},
					{
						displayName: 'Updated by user',
						name: 'updated_by',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getUsers',
						},
						description: 'Select user',
						noDataExpression: true,
					},
					{
						displayName: 'Closed at',
						name: 'closed_at',
						type: 'dateTime',
						default: undefined,
					},
					{
						displayName: 'Created at',
						name: 'created_at',
						type: 'dateTime',
						default: undefined,
					},
					{
						displayName: 'Updated at',
						name: 'updated_at',
						type: 'dateTime',
						default: undefined,
					},
					{
						displayName: 'Loss reason',
						name: 'loss_reason_id',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getLossReasons',
						},
						noDataExpression: true,
					},
					{
						displayName: 'Responsible user',
						name: 'responsible_user_id',
						type: 'options',
						default: [],
						typeOptions: {
							loadOptionsMethod: 'getUsers',
						},
						description: 'Select user',
						noDataExpression: true,
					},
					{
						displayName: 'Custom fields',
						name: 'custom_fields_values',
						placeholder: 'Add custom field',
						type: 'fixedCollection',
						default: undefined,
						typeOptions: {
							multipleValues: true,
						},
						options: [
							{
								displayName: 'Custom field',
								name: 'custom_field',
								values: [
									{
										displayName: 'Name',
										name: 'data',
										type: 'options',
										typeOptions: {
											loadOptionsMethod: 'getCustomFields',
										},
										default: [],
										required: true,
									},
									{
										displayName: 'Enum id',
										name: 'enum_id',
										type: 'number',
										default: null,
									},
									{
										displayName: 'Enum code',
										name: 'enum_code',
										type: 'string',
										default: '',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
									},
								],
							},
						],
					},
					{
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
								displayName: 'Tags',
								name: 'tags',
								values: [
									{
										displayName: 'Tag',
										name: 'id',
										type: 'multiOptions',
										typeOptions: {
											loadOptionsMethod: 'getTags',
										},
										default: [],
									},
								],
							},
						],
					},
					{
						displayName: 'Request ID',
						name: 'request_id',
						type: 'string',
						default: undefined,
					},
				],
			},
		],
	},
];
