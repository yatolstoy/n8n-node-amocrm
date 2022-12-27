import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export const addLimitDescription = (
	displayOptions: IDisplayOptions | undefined,
): INodeProperties => {
	return {
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['unsorted'],
				operation: ['get'],
			},
		},
		typeOptions: {
			maxValue: 250,
			minValue: 1,
			numberStepSize: 1,
		},
		default: 50,
	};
};
