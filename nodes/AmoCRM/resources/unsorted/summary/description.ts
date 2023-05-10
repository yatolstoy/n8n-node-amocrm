import { IUnsortedProperties } from '../../interfaces';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';

const displayOptions = {
	show: {
		resource: ['unsorted'],
		operation: ['summary'],
	},
};

export const description: IUnsortedProperties = [
	addFilterDescription(displayOptions, [
		{
			displayName: 'Uids',
			name: 'uid',
			type: 'string',
			default: '',
			description: 'List UIDs separated by commas',
		},
		{
			displayName: 'Pipeline id',
			name: 'pipeline_id',
			type: 'options',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getPipelines',
			},
			description: 'Select pipeline',
			noDataExpression: false,
		},
		addDateRangeDescription('Created at', 'created_at'),
	]),
];
