import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addRequestId = (displayOptions?: IDisplayOptions): INodeProperties => {
	return {
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
		displayOptions,
	};
};
