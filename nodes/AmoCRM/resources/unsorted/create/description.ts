import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makeUnsortedModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['create'],
	},
};

const callMetadataDescription: IUnsortedProperties = [
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
		default: '',
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
		displayName: 'Is need to add call event',
		name: 'is_call_event_needed',
		type: 'boolean',
		default: false,
	},
];

const formMetadataDescription: IUnsortedProperties = [
	{
		displayName: 'Form id',
		name: 'form_id',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Form name',
		name: 'form_name',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Form page',
		name: 'form_page',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Ip',
		name: 'ip',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Form sent at',
		name: 'form_sent_at',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Referer',
		name: 'referer',
		type: 'string',
		default: '',
	},
];

const chatMetadataDescription: IUnsortedProperties = [
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Received at',
		name: 'received_at',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Service',
		name: 'service',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Client name',
		name: 'client[name]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Client avatar',
		name: 'client[avatar]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Origin chat_id',
		name: 'origin[chat_id]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Origin ref',
		name: 'origin[ref]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Origin visitor UID',
		name: 'origin[visitor_uid]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Last message text',
		name: 'last_message_text',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Source name',
		name: 'source_name',
		type: 'string',
		default: '',
	},
];

const mailMetadataDescription: IUnsortedProperties = [
	{
		displayName: 'From email',
		name: 'from[email]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'From name',
		name: 'from[name]',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Received at',
		name: 'received_at',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Thread ID',
		name: 'thread_id',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Message ID',
		name: 'message_id',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Content summary',
		name: 'content_summary',
		type: 'string',
		default: '',
	},
];

export const description: IUnsortedProperties = [
	{
		displayName: 'JSON Parameters',
		name: 'json',
		type: 'boolean',
		displayOptions,
		default: false,
	},
	{
		displayName: 'Unsorted type',
		name: 'unsorted_type',
		type: 'options',
		default: 'sip',
		options: [
			{
				name: 'Sip',
				value: 'sip',
			},
			{
				name: 'Form',
				value: 'form',
			},
		],
		displayOptions: {
			show: {
				...displayOptions?.show,
				json: [true],
			},
			hide: {
				...displayOptions?.hide,
			},
		},
	},
	{
		displayName: 'JSON',
		name: 'json_string',
		type: 'string',
		default: '={{JSON.stringify([{key: "value"}])}}',
		displayOptions: {
			show: {
				...displayOptions?.show,
				json: [true],
			},
			hide: {
				...displayOptions?.hide,
			},
		},
	},
	{
		displayName: 'Unsorted',
		name: 'collection',
		placeholder: 'Add unsorted',
		type: 'fixedCollection',
		default: {},
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
				displayName: 'Call',
				name: 'sip',
				values: makeUnsortedModelDescription(callMetadataDescription),
			},
			{
				displayName: 'Form',
				name: 'form',
				values: makeUnsortedModelDescription(formMetadataDescription),
			},
			// {
			// 	displayName: 'Chat',
			// 	name: 'chat',
			// 	values: makeUnsortedModelDescription(chatMetadataDescription),
			// },
			// {
			// 	displayName: 'Mail',
			// 	name: 'mail',
			// 	values: makeUnsortedModelDescription(mailMetadataDescription),
			// },
		],
	},
];
