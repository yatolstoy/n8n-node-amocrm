import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function getInfo(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	qs.with =
		Array.isArray(additionalFields) && additionalFields.length
			? additionalFields.join(',')
			: undefined;
	const requestMethod = 'GET';
	const endpoint = `account`;
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData);
}
