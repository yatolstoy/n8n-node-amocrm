import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest, apiRequestAllItems } from '../../../transport';

interface FilterFromFrontend {
	query?: string;
	id?: string;
}

interface IFilter {
	id?: number[];
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;

	//--------------------------------Add filter--------------------------------------

	const filter = this.getNodeParameter('filter', 0) as FilterFromFrontend;
	if (filter.query) qs.query = filter.query;

	const filterWithoutQuery = JSON.parse(JSON.stringify(filter)) as FilterFromFrontend;
	delete filterWithoutQuery.query;

	if (Object.keys(filterWithoutQuery).length) {
		qs.filter = {
			id: filterWithoutQuery.id
				?.toString()
				.split(',')
				.map((el) => Number(el.trim())),
		} as IFilter;
	}

	//------------------------------Add pagination-------------------------------------
	const returnAll = this.getNodeParameter('returnAll', 0) as boolean;
	if (!returnAll) {
		const page = this.getNodeParameter('page', 0) as number;
		qs.page = page;
	}
	const limit = this.getNodeParameter('limit', 0) as number;
	qs.limit = limit;

	//---------------------------------------------------------------------------------

	const listId = this.getNodeParameter('catalog_id', 0) as boolean;

	const requestMethod = 'GET';
	const endpoint = `catalogs/${listId}/elements`;

	if (returnAll) {
		const responseData = await await apiRequestAllItems.call(
			this,
			requestMethod,
			endpoint,
			body,
			qs,
		);
		return this.helpers.returnJsonArray(responseData);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
