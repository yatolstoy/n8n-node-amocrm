import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { apiRequest } from '../../../transport';
import { IUpdateCatalogForm, RequestCatalogUpdate } from '../types';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'PATCH';
	const endpoint = `catalogs`;

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

	const catalogsCollection = (await this.getNodeParameter('collection', 0)) as IUpdateCatalogForm;

	const body = catalogsCollection.catalog
		.map((list): RequestCatalogUpdate => {
			return {
				...list,
				id: Number(list.id),
				name: String(list.name),
				can_add_elements: Boolean(list.can_add_elements),
				can_link_multiple: Boolean(list.can_link_multiple),
				request_id: !!list.request_id ? String(list.request_id) : undefined,
			};
		})
		.map(clearNullableProps);

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
