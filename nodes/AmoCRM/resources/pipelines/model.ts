import {
	IDisplayOptions,
	INodeProperties,
	INodePropertyCollection,
	INodePropertyOptions,
} from 'n8n-workflow';

export const pipelineModelDescription = (
	displayOptions?: IDisplayOptions,
): Array<INodeProperties> => [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: undefined,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'number',
		default: 1,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Is main',
		name: 'is_main',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Is unsorted on',
		name: 'is_unsorted_on',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions,
	},
];

export const makePipelineModelDescription = (
	embeddedOptions?: Array<INodeProperties | INodePropertyOptions | INodePropertyCollection>,
): Array<INodeProperties> => {
	const model: INodeProperties[] = [...pipelineModelDescription()];
	const options = embeddedOptions ? [...embeddedOptions] : [];

	const embedded: INodeProperties = {
		displayName: 'Embedded',
		name: '_embedded',
		placeholder: 'Add custom embedded',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [...options],
	};

	model.push(embedded);

	return model;
};
