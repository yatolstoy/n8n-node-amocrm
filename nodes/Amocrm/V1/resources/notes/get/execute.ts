import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { INumRange, IStringRange } from '../../../Interface';

import { apiRequest, apiRequestAllItems } from '../../../transport';
import { makeRangeProperty } from '../../_components/DateRangeDescription';

interface IFilter {
	id?: number[];
	entity_id?: number[];
	note_type?: string[];
	updated_at: INumRange;
}

interface FilterFromFrontend {
	id?: string;
	entity_id?: string;
	note_type?: string[];
	updated_at?: {
		dateRangeCustomProperties: IStringRange;
	};
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;

	//--------------------------------Add filter--------------------------------------

	const filter = this.getNodeParameter('filter', 0) as FilterFromFrontend;

	// return this.helpers.returnJsonArray([]);

	if (Object.keys(filter).length) {
		qs.filter = {
			...filter,
			id: filter.id
				?.toString()
				.split(',')
				.map((el) => Number(el.trim())),
			entity_id: filter.entity_id
				?.toString()
				.split(',')
				.map((el) => Number(el.trim())),
			note_type: filter.note_type,
			updated_at: makeRangeProperty(filter.updated_at?.dateRangeCustomProperties),
		} as IFilter;
	}

	//---------------------------------------------------------------------------------

	//--------------------------------Add options--------------------------------------
	const options = this.getNodeParameter('options', 0) as {
		sort: {
			sortSettings: {
				sort_by: string;
				sort_order: string;
			};
		};
	};

	if (options.sort?.sortSettings) {
		qs.order = {
			[options.sort.sortSettings.sort_by]: options.sort.sortSettings.sort_order,
		};
	}
	//---------------------------------------------------------------------------------

	const returnAll = this.getNodeParameter('returnAll', 0) as boolean;

	//------------------------------Add pagination-------------------------------------
	if (!returnAll) {
		const page = this.getNodeParameter('page', 0) as number;
		qs.page = page;
	}
	const limit = this.getNodeParameter('limit', 0) as number;
	qs.limit = limit;

	//---------------------------------------------------------------------------------

	const requestMethod = 'GET';
	const endpoint = (await this.getNodeParameter('entity_type', 0)) + '/notes';

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
