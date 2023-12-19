import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const responseData = await apiRequest.call(this, 'GET', `leads/pipelines`, {}, qs);

	return this.helpers.returnJsonArray(responseData);
}
