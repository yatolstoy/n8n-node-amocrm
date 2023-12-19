import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(
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
