import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addJsonParametersDescription = (
	displayOptions: IDisplayOptions | undefined,
): INodeProperties[] => {
	return [
		{
			displayName: 'JSON Parameters',
			name: 'json',
			type: 'boolean',
			displayOptions,
			default: false,
			noDataExpression: true,
		},
		{
			displayName: 'Stringifyed array of objects',
			name: 'jsonString',
			type: 'string',
			default: '={{JSON.stringify([{key: "value"}])}}',
			displayOptions: {
				show: {
					...displayOptions?.show,
					json: [true],
				},
				hide: {
					...displayOptions?.hide,
				},
			},
		},
	];
};
