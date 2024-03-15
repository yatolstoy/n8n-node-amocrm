import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addRequestId = (displayOptions?: IDisplayOptions): INodeProperties => {
	return {
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
		displayOptions,
		description: 'The field that will be returned unchanged in the response and will not be saved',
	};
};
