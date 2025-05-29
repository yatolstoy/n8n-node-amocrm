import {
	IDisplayOptions,
	INodeProperties,
	INodePropertyCollection,
	INodePropertyOptions,
} from 'n8n-workflow';

export const addWithDescription = (
	displayOptions: IDisplayOptions | undefined,
	options: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection> | undefined,
): INodeProperties => {
	return {
		displayName: 'With',
		name: 'with',
		type: 'multiOptions',
		displayOptions,
		default: [],
		noDataExpression: true,
		options,
	};
};
