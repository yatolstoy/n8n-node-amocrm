import {
	IDisplayOptions,
	INodeProperties,
	INodePropertyCollection,
	INodePropertyOptions,
} from 'n8n-workflow';

export const addFilterDescription = (
	displayOptions: IDisplayOptions | undefined,
	options: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection> | undefined,
): INodeProperties => {
	return {
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		placeholder: 'Add filter',
		default: {},
		displayOptions,
		options,
	};
};
