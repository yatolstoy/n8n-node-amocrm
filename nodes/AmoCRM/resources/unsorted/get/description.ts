import { IUnsortedProperties } from '../../interfaces';
import { addSortDescription } from '../../_components/SortDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addFilterDescription } from '../../_components/FilterDescription';

export const accountGetInfoDescription: IUnsortedProperties = [
	addReturnAll({
		show: {
			resource: ['unsorted'],
			operation: ['get'],
		},
	}),
	addFilterDescription(
		{
			show: {
				resource: ['unsorted'],
				operation: ['get'],
			},
		},
		[
			{
				displayName: 'Uids',
				name: 'uid',
				type: 'string',
				default: '',
				description: 'List UIDs separated by commas',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'multiOptions',
				default: [],
				options: [
					{
						name: 'Sip',
						value: 'sip',
					},
					{
						name: 'Mail',
						value: 'mail',
					},
					{
						name: 'Forms',
						value: 'forms',
					},
					{
						name: 'Chats',
						value: 'chats',
					},
				],
				noDataExpression: true,
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
				noDataExpression: true,
			},
		],
	),
	addPageDescription({
		show: {
			resource: ['unsorted'],
			operation: ['get'],
			returnAll: [false],
		},
	}),
	addLimitDescription({
		show: {
			resource: ['unsorted'],
			operation: ['get'],
		},
	}),
	addSortDescription([
		{ name: 'Created at', value: 'created_at' },
		{ name: 'Updated at', value: 'updated_at' },
	]),
];
