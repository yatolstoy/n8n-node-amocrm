import { IDisplayOptions } from 'n8n-workflow';
import { INotesProperties } from '../../interfaces';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';
import { entityType } from '../entity';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['notes'],
		operation: ['getNotes'],
	},
};

export const description: INotesProperties = [
	...entityType(displayOptions),
	addReturnAll(displayOptions),
	addFilterDescription(displayOptions, [
		{
			displayName: 'List of Note IDs',
			name: 'id',
			type: 'string',
			default: '',
			description: 'Note IDs separated by commas',
		},
		{
			displayName: 'List of Entity IDs',
			name: 'entity_id',
			type: 'string',
			default: '',
			description: 'Entity IDs separated by commas',
		},
		{
			displayName: 'Note Type',
			name: 'note_type',
			type: 'multiOptions',
			default: [],
			options: [
				'call_in',
				'call_out',
				'geolocation',
				'message_cashier',
				'service_message',
				'sms_in',
				'sms_out',
				'common',
				'extended_service_message',
				'attachment',
			].map((el) => ({ name: el, value: el })),
		},
		addDateRangeDescription('Updated at', 'updated_at'),
	]),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: { sortSettings: { sort_by: 'updated_at', sort_order: 'asc' } },
		displayOptions,
		options: [
			addSortDescription(undefined, [
				{
					name: 'Date Update',
					value: 'updated_at',
				},
				{
					name: 'ID',
					value: 'id',
				},
			]),
		],
	},
	addPageDescription({
		show: {
			...displayOptions.show,
			returnAll: [false],
		},
	}),
	addLimitDescription(displayOptions),
];
