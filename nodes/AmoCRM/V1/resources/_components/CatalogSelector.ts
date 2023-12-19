import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addCatalogSelector = (
	displayOptions?: IDisplayOptions | undefined,
): INodeProperties => {
	return {
		displayName: 'Catalog Name or ID',
		name: 'catalog_id',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getCatalogs',
		},
		required: true,
		displayOptions,
	};
};
