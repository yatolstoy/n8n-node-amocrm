import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { INumRange, IStringRange } from '../../../Interface';

import { apiRequest, apiRequestAllItems } from '../../../transport';
import { makeRangeProperty } from '../../_components/DateRangeDescription';

interface IFilter {
	id?: number[];
	name?: string[];
	price?: INumRange;
	pipelines?: number[];
	statuses?: number[];
	created_by?: number[];
	updated_by?: number[];
	responsible_user_id?: number[];
	created_at: INumRange;
	updated_at: INumRange;
	closed_at: INumRange;
	closest_task_at: INumRange;
}

interface FilterFromFrontend {
	query?: string;
	id?: string;
	name?: string;
	price?: {
		rangeCustom: INumRange;
	};
	pipelines?: number[];
	statuses?: string[];
	created_by?: number[];
	updated_by?: number[];
	responsible_user_id?: number[];
	created_at?: {
		dateRangeCustomProperties: IStringRange;
	};
	updated_at?: {
		dateRangeCustomProperties: IStringRange;
	};
	closed_at?: {
		dateRangeCustomProperties: IStringRange;
	};
	closest_task_at?: {
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
	if (filter.query) qs.query = filter.query;

	const filterWithoutQuery = JSON.parse(JSON.stringify(filter)) as FilterFromFrontend;
	delete filterWithoutQuery.query;

	if (Object.keys(filterWithoutQuery).length) {
		qs.filter = {
			...filterWithoutQuery,
			id: filterWithoutQuery.id
				?.toString()
				.split(',')
				.map((el) => Number(el.trim())),
			name: filterWithoutQuery.name
				?.toString()
				.split(',')
				.map((el) => el.trim()),
			price: filterWithoutQuery.price?.rangeCustom,
			created_at: makeRangeProperty(filterWithoutQuery.created_at?.dateRangeCustomProperties),
			updated_at: makeRangeProperty(filterWithoutQuery.updated_at?.dateRangeCustomProperties),
			closest_task_at: makeRangeProperty(
				filterWithoutQuery.closest_task_at?.dateRangeCustomProperties,
			),
			closed_at: makeRangeProperty(filterWithoutQuery.closed_at?.dateRangeCustomProperties),
			pipeline_id: filterWithoutQuery.pipelines || undefined,
			pipelines: undefined,
			statuses:
				filterWithoutQuery.statuses?.map((el) => ({
					pipeline_id: Number(el.split('_')[0]),
					status_id: Number(el.split('_')[1]),
				})) || undefined,
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
		with?: string[];
	};
	qs.with = options.with ? options.with.join(',') : undefined;

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
	const endpoint = `leads`;

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
