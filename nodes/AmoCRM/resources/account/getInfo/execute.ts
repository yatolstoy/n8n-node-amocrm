import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function getInfo(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const qs = {} as IDataObject;
	const additionalFields = this.getNodeParameter('with', 0) as IDataObject;
	qs.with =
		Array.isArray(additionalFields) && additionalFields.length
			? additionalFields.join(',')
			: undefined;
	const responseData = await apiRequest.call(this, 'GET', `account`, {}, qs);

	return this.helpers.returnJsonArray(responseData);
}
