import { ILeadsProperties } from '../../interfaces';

export const description: ILeadsProperties = [
	{
		displayName: 'JSON Parameters',
		name: 'json',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['create'],
			},
		},
		default: false,
	},
	{
		displayName: 'Stringifyed array of objects',
		name: 'jsonString',
		type: 'string',
		default: '={{JSON.stringify([{name: "example"}])}}',
		displayOptions: {
			show: {
				resource: ['leads'],
				operation: ['create'],
				json: [true],
			},
		},
	},
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
				resource: ['leads'],
				operation: ['create'],
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Lead',
				name: 'lead',
				values: [
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
														displayName: 'Is main',
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
							{
								displayName: 'Source',
								name: 'source',
								values: [
									{
										displayName: 'External id',
										name: 'external_id',
										type: 'number',
										default: 0,
									},
									{
										displayName: 'Type',
										name: 'type',
										type: 'hidden',
										default: 'widget',
									},
								],
							},
						],
					},
				],
			},
		],
	},
];
