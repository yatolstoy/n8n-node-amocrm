import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addCatalogSelector = (
	displayOptions?: IDisplayOptions | undefined,
): INodeProperties => {
	return {
		displayName: 'Catalog',
		name: 'catalog_id',
		type: 'options',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		required: true,
		displayOptions,
	};
};
