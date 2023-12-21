import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { apiRequest } from '../../../transport';
import { getTimestampFromDateString } from '../../../helpers/getTimestampFromDateString';
import { IFormTask, RequestTaskCreate } from '../types';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const endpoint = `tasks`;

	const jsonParams = (await this.getNodeParameter('json', 0)) as boolean;

	if (jsonParams) {
		const jsonString = (await this.getNodeParameter('jsonString', 0)) as string;
		const responseData = await apiRequest.call(
			this,
			requestMethod,
			endpoint,
			JSON.parse(jsonString),
		);
		return this.helpers.returnJsonArray(responseData);
	}

	const tasksCollection = (await this.getNodeParameter('collection', 0)) as IFormTask;

	const body = tasksCollection.task
		.map((task): RequestTaskCreate => {
			const data = { ...task, result: { text: task.resultText }, resultText: undefined };
			return {
				...data,
				complete_till: getTimestampFromDateString(task.complete_till) || 0,
				entity_id: Number(task.entity_id),
				result: { text: task.resultText },
				created_at: getTimestampFromDateString(task.created_at),
				updated_at: getTimestampFromDateString(task.updated_at),
				duration: Number(task.duration),
			};
		})
		.map(clearNullableProps);

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
