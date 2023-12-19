import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addReturnAll = (displayOptions: IDisplayOptions | undefined): INodeProperties => {
	return {
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions,
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	};
};
