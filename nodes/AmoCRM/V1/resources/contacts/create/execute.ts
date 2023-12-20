import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm } from '../../../Interface';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';
import { makeTagsArray } from '../../../helpers/makeTagsArray';
import { getTimestampFromDateString } from '../../../helpers/getTimestampFromDateString';

interface IFormContact {
	contact: Array<{
		name?: string;
		first_name?: string;
		last_name?: string;
		responsible_user_id?: number | number[];
		created_by?: number | number[];
		updated_by?: number | number[];
		created_at?: string;
		updated_at?: string;
		custom_fields_values?: ICustomFieldValuesForm;
		_embedded?: {
			tags?: Array<{
				id: number[];
			}>;
		};
	}>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const endpoint = `contacts`;

	const jsonParams = (await this.getNodeParameter('json', 0)) as boolean;

	if (jsonParams) {
		const data = await this.getNodeParameter('jsonString', 0);
		const body = typeof data === 'string' ? JSON.parse(data) : data;
		const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
		return this.helpers.returnJsonArray(responseData);
	}

	const collection = (await this.getNodeParameter('collection', 0)) as IFormContact;

	const body = collection.contact
		.map((contact) => ({
			...contact,
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
