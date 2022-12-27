import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addReturnAll = (displayOptions: IDisplayOptions | undefined): INodeProperties => {
	return {
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions,
		default: false,
		description: 'If all results should be returned.',
	};
};
