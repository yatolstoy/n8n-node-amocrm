import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest, apiRequestAllItems } from '../../../transport';
import { makeRangeProperty } from '../../_components/DateRangeDescription';
import { stringToArray } from '../../../helpers/stringToArray';

interface IFilter {
	responsible_user_id?: number | number[];
	is_completed?: 0 | 1;
	task_type?: number | number[];
	entity_type?: string;
	entity_id?: number | number[];
	id?: number | number[];
	updated_at?: {
		from: number;
		to: number;
	};
}

interface FilterFromFrontend {
	responsible_user_id: number[];
	is_completed: boolean;
	task_type: number[];
	entity_type: string;
	entity_id: string;
	id: string;
	updated_at: {
		dateRangeCustomProperties: {
			from: string;
			to: string;
		};
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

	qs.filter = {
		...filter,
		is_completed: filter.is_completed ? 1 : 0,
		id: stringToArray(filter.id).filter((id) => typeof id === 'number'),
		entity_id: stringToArray(filter.entity_id).filter((id) => typeof id === 'number'),
		updated_at: filter.updated_at && makeRangeProperty(filter.updated_at.dateRangeCustomProperties),
	} as IFilter;

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
	const endpoint = `tasks`;

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
