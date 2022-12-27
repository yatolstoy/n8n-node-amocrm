import { INodeProperties, INodePropertyCollection, INodePropertyOptions } from 'n8n-workflow';

export const addSortDescription = (
	sortByOptions: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
): INodeProperties => {
	return {
		displayName: 'Sort',
		name: 'sort',
		placeholder: 'Add sorting',
		type: 'fixedCollection',
		default: {},
		options: [
			{
				displayName: 'Sort settings',
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
						default: '',
						required: true,
						description: 'Ascending or descending order sort order',
					},
				],
			},
		],
	};
};
