import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm } from '../../../Interface';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';
import { getTimestampFromDateString } from '../../../helpers/getTimestampFromDateString';

interface IForm {
	company: Array<{
		id?: number;
		name?: string;
		created_by?: number | number[];
		updated_by?: number | number[];
		responsible_user_id?: number | number[];
		created_at?: string;
		updated_at?: string;
		custom_fields_values?: ICustomFieldValuesForm;
		_embedded?: {
			tags?: Array<{
				id: number[];
			}>;
		};
		request_id: string;
	}>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'PATCH';
	const endpoint = `companies`;

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

	const collection = (await this.getNodeParameter('collection', 0)) as IForm;

	const body = collection.company
		.map((company) => ({
			...company,
			id: Number(company.id),
			created_at: getTimestampFromDateString(company.created_at),
			updated_at: getTimestampFromDateString(company.updated_at),
			custom_fields_values:
				company.custom_fields_values && makeCustomFieldReqObject(company.custom_fields_values),
			_embedded: {
				...company._embedded,
				tags: company._embedded?.tags?.flatMap((group) => group.id.map((id) => ({ id }))),
			},
		}))
		.map(clearNullableProps);
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
