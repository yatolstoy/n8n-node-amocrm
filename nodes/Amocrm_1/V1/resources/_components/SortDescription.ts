import {
	IDisplayOptions,
	INodeProperties,
	INodePropertyCollection,
	INodePropertyOptions,
} from 'n8n-workflow';

export const addSortDescription = (
	displayOptions?: IDisplayOptions,
	sortByOptions?: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
): INodeProperties => {
	return {
		displayName: 'Sort',
		name: 'sort',
		placeholder: 'Add sorting',
		type: 'fixedCollection',
		displayOptions,
		default: {},
		options: [
			{
				displayName: 'Sort Settings',
				name: 'sortSettings',
				values: [
					{
						displayName: 'Sort By',
						name: 'sort_by',
						type: 'options',
						options: sortByOptions,
						default: '',
						required: true,
						description: 'Field to sort records by',
					},
					{
						displayName: 'Sort Order',
						name: 'sort_order',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'asc',
						required: true,
						description: 'Ascending or descending order sort order',
					},
				],
			},
		],
	};
};
