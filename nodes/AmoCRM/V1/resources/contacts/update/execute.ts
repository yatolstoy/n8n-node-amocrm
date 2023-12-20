import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm } from '../../../Interface';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';

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
			custom_fields_values:
				contact.custom_fields_values && makeCustomFieldReqObject(contact.custom_fields_values),
			_embedded: {
				...contact._embedded,
				tags: contact._embedded?.tags?.flatMap((group) => {
					if (typeof group.id === 'string') return [{ name: group.id }];
					if (typeof group.id === 'object')
						return group.id.map((val) => {
							if (typeof val === 'number') return { id: val };
							if (typeof val === 'string') return { name: val };
						});
				}),
			},
		}))
		.map(clearNullableProps);
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
