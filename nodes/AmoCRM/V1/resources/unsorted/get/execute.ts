import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';

import { apiRequest, apiRequestAllItems } from '../../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', 0) as unknown as IDataObject;
	const page = !returnAll ? (this.getNodeParameter('page', 0) as IDataObject) : undefined;
	const limit = this.getNodeParameter('limit', 0) as unknown as IDataObject;
	const sort = this.getNodeParameter('sort', 0) as {
		sortSettings?: { sort_by: string; sort_order: string };
	};
	const filter = this.getNodeParameter('filter', 0) as IDataObject;

	const uid = filter?.uid as string;

	const qs = {} as IDataObject;
	qs.page = !returnAll && page;
	qs.limit = limit;
	qs.filter = {
		uid: uid?.split(','),
		category: filter?.category,
		pipeline_id: filter?.pipeline_id,
	};
	qs.order = sort.sortSettings
		? { [sort.sortSettings.sort_by]: sort.sortSettings.sort_order }
		: undefined;

	const method = 'GET';
	const endpoint = `leads/unsorted`;

	const responseData = returnAll
		? await apiRequestAllItems.call(this, method, endpoint, {}, clearNullableProps(qs))
		: await apiRequest.call(this, method, endpoint, {}, clearNullableProps(qs));

	return this.helpers.returnJsonArray(responseData);
}
