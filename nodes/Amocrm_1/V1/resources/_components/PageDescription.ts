import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addPageDescription = (
	displayOptions: IDisplayOptions | undefined,
): INodeProperties => {
	return {
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions,
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Select page',
	};
};
