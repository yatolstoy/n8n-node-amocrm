import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { apiRequest } from '../../../transport';
import { IFormCatalog, RequestCatalogCreate } from '../types';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
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

	const catalogsCollection = (await this.getNodeParameter('collection', 0)) as IFormCatalog;

	const body = catalogsCollection.catalog
		.map((catalog): RequestCatalogCreate => {
			return {
				...catalog,
				name: String(catalog.name),
				type: String(catalog.type),
				sort: Number(catalog.sort) || undefined,
				can_add_elements: Boolean(catalog.can_add_elements),
				can_link_multiple: Boolean(catalog.can_link_multiple),
				request_id: !!catalog.request_id ? String(catalog.request_id) : undefined,
			};
		})
		.map(clearNullableProps);

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
