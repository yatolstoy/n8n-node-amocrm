import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;

	const options = this.getNodeParameter('options', 0) as {
		sort_by?: string;
		sort_order?: string;
		page?: number;
		limit?: number;
		with?: string[];
	};

	const query = this.getNodeParameter('query', 0) as string;
	qs.query = query.length ? query : undefined;

	const additional = options.with ? options.with.join(',') : undefined;
	qs.with = additional;

	if (options?.sort_by && options?.sort_order) {
		qs.order = {
			[options.sort_by]: options.sort_order,
		};
	}

	qs.page = options?.page ? options.page : undefined;
	qs.limit = options?.limit ? options.limit : undefined;

	const requestMethod = 'GET';
	const endpoint = `leads`;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData);
}
