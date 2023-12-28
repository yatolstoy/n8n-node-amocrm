import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { addRequestId } from '../_components/RequestId';

export const generalOptions: INodeProperties[] = [
	{
		displayName: 'Created At',
		name: 'created_at',
		type: 'dateTime',
		default: undefined,
	},
	{
		displayName: 'Entity ID',
		name: 'entity_id',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Created by User Name or ID',
		name: 'created_by',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 0,
		typeOptions: {
			loadOptionsMethod: 'getActiveUsersWithRobot',
		},
		description:
			'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Is Need To Trigger Digital Pipeline',
		name: 'is_need_to_trigger_digital_pipeline',
		type: 'boolean',
		default: false,
	},
];

export const entityType = (displayOptions: IDisplayOptions): INodeProperties[] => [
	{
		displayName: 'Entity Type',
		name: 'entity_type',
		type: 'options',
		default: 'leads',
		options: [
			{
				name: 'Lead',
				value: 'leads',
			},
			{
				name: 'Contact',
				value: 'contacts',
			},
			{
				name: 'Company',
				value: 'companies',
			},
			{
				name: 'Customer',
				value: 'customers',
			},
		],
		displayOptions,
	},
];

export const getNotesDescription = (
	displayOptions: IDisplayOptions,
	nodeProperties: INodeProperties[] = [],
): INodeProperties[] => [
	{
		displayName: 'Notes',
		name: 'notes',
		placeholder: 'Add note',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Common',
				name: 'common',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Call In',
				name: 'call_in',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Uniq',
						name: 'uniq',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Duration',
						name: 'duration',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Source',
						name: 'source',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Link',
						name: 'link',
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
						displayName: 'Call Responsible',
						name: 'call_responsible',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Call Out',
				name: 'call_out',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Uniq',
						name: 'uniq',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Duration',
						name: 'duration',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Source',
						name: 'source',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Link',
						name: 'link',
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
						displayName: 'Call Responsible Name or ID',
						name: 'call_responsible',
						type: 'options',
						default: '',
						typeOptions: {
							loadOptionsMethod: 'getActiveUsers',
						},
						description:
							'Select user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Service Message',
				name: 'service_message',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Service',
						name: 'service',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Extended Service Message',
				name: 'extended_service_message',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Service',
						name: 'service',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Message Cashier',
				name: 'message_cashier',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Created',
								value: 'created',
							},
							{
								name: 'Shown',
								value: 'shown',
							},
							{
								name: 'Selected',
								value: 'selected',
							},
						],
						default: 'created',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Geolocation',
				name: 'geolocation',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Longitude',
						name: 'longitude',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Latitude',
						name: 'latitude',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Sms In',
				name: 'sms_in',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Sms Out',
				name: 'sms_out',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
			{
				displayName: 'Attachment',
				name: 'attachment',
				values: [
					...nodeProperties,
					...generalOptions,
					{
						displayName: 'Version Uuid',
						name: 'version_uuid',
						type: 'string',
						default: '',
					},
					{
						displayName: 'File Uuid',
						name: 'file_uuid',
						type: 'string',
						default: '',
					},
					{
						displayName: 'File Name',
						name: 'file_name',
						type: 'string',
						default: '',
					},
					addRequestId(),
				],
			},
		],
		displayOptions: {
			show: {
				...displayOptions.show,
				json: [false],
			},
		},
	},
];
