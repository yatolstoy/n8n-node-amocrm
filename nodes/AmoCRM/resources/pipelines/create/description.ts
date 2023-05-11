import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { IPipelinesProperties } from '../../interfaces';
import { addJsonParametersDescription } from '../../_components/JsonParametersDescription';
import { makePipelineModelDescription } from '../model';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['pipelines'],
		operation: ['create'],
	},
};

export const createPipelineModel: INodeProperties[] = [
	...makePipelineModelDescription([
		{
			displayName: 'Statuses',
			name: 'statuses',
			values: [
				{
					displayName: 'Statuses',
					name: 'id',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: [],
					required: true,
					placeholder: 'Add status',
					options: [
						{
							displayName: 'Status',
							name: 'status',
							values: [
								{
									displayName: 'Id',
									name: 'id',
									type: 'options',
									default: false,
									options: [
										{
											name: 'Новый статус',
											value: false,
										},
										{
											name: 'Успешно реализовано',
											value: '142',
										},
										{
											name: 'Закрыто и нереализовано',
											value: '143',
										},
									],
								},
								{
									displayName: 'Name',
									name: 'name',
									type: 'string',
									default: '',
									required: true,
								},
								{
									displayName: 'Sort',
									name: 'sort',
									type: 'number',
									default: 1,
									required: true,
								},
								{
									displayName: 'Color',
									name: 'color',
									type: 'options',
									default: '#d6eaff',
									options: [
										{
											name: 'Очень светлый желтый',
											value: '#fffeb2',
										},
										{
											name: 'Cветлый желтый',
											value: '#fffd7f',
										},
										{
											name: 'Желтый',
											value: '#fff000',
										},
										{
											name: 'Очень светлый оранжевый',
											value: '#ffeab2',
										},
										{
											name: 'Cветлый оранжевый',
											value: '#ffdc7f',
										},
										{
											name: 'Оранжевый',
											value: '#ffce5a',
										},
										{
											name: 'Очень светлый красный',
											value: '#ffdbdb',
										},
										{
											name: 'Cветлый красный',
											value: '#ffc8c8',
										},
										{
											name: 'Красный',
											value: '#ff8f92',
										},
										{
											name: 'Очень светлый синий',
											value: '#d6eaff',
										},
										{
											name: 'Cветлый синий',
											value: '#c1e0ff',
										},
										{
											name: 'Синий',
											value: '#98cbff',
										},
										{
											name: 'Очень светлый зелёный',
											value: '#ebffb1',
										},
										{
											name: 'Cветлый зелёный',
											value: '#deff81',
										},
										{
											name: 'Зелёный',
											value: '#87f2c0',
										},
										{
											name: 'Очень светлый фиолетовый',
											value: '#f9deff',
										},
										{
											name: 'Cветлый фиолетовый',
											value: '#f3beff',
										},
										{
											name: 'Фиолетовый',
											value: '#eb93ff',
										},
										{
											name: 'Очень светлый серый',
											value: '#f2f3f4',
										},
										{
											name: 'Cветлый серый',
											value: '#e6e8ea',
										},
										{
											name: 'Серый',
											value: '#ccc8f9',
										},
									],
								},
							],
						},
					],
				},
			],
		},
	]),
	{
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: undefined,
	},
];

export const description: IPipelinesProperties = [
	...addJsonParametersDescription(displayOptions),
	{
		displayName: 'Pipelines',
		name: 'collection',
		placeholder: 'Add pipeline',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...displayOptions.show,
				json: [false],
			},
		},
		options: [
			{
				displayName: 'Pipelines',
				name: 'pipelines',
				values: createPipelineModel,
			},
		],
	},
];
