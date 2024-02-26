import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm } from '../../../Interface';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';
import { makeTagsArray } from '../../../helpers/makeTagsArray';
import { getTimestampFromDateString } from '../../../helpers/getTimestampFromDateString';

interface IForm {
	contact: Array<{
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
				id: number[] | string[];
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
	const endpoint = `contacts`;

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

	const body = collection.contact
		.map((contact) => ({
			...contact,
			id: Number(contact.id),
			created_at: getTimestampFromDateString(contact.created_at),
			updated_at: getTimestampFromDateString(contact.updated_at),
			custom_fields_values:
				contact.custom_fields_values && makeCustomFieldReqObject(contact.custom_fields_values),
			_embedded: {
				...contact._embedded,
				tags: contact._embedded?.tags?.flatMap(makeTagsArray),
			},
		}))
		.map(clearNullableProps);
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
