import { IExecuteFunctions } from 'n8n-core';

import { INodeExecutionData } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm, ITypeField } from '../../../Interface';

import { apiRequest } from '../../../transport';

interface IFormLead {
	lead: Array<{
		id?: number;
		name?: string;
		price?: number;
		pipeline_id?: number | number[];
		status_id?: number | number[];
		created_by?: number | number[];
		updated_by?: number | number[];
		responsible_user_id?: number | number[];
		closed_at?: string;
		created_at?: string;
		updated_at?: string;
		loss_reason_id?: number | number[];
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
	const requestMethod = 'PATCH';
	const endpoint = `leads`;

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

	const leadsCollection = (await this.getNodeParameter('collection', 0)) as IFormLead;

	const body = leadsCollection.lead
		.map((lead) => ({
			...lead,
			custom_fields_values: lead.custom_fields_values?.custom_field?.reduce(
				(
					acc: {
						field_id: number;
						values: { value?: number | boolean | string; enum_id?: number; enum_code?: string }[];
					}[],
					cf,
				) => {
					let value, enum_id, enum_code;
					const data = JSON.parse(cf.data) as { id: number; type: ITypeField };
					switch (data.type) {
						case 'checkbox':
							value = Boolean(cf.value);
							break;
						case 'date':
						case 'date_time':
						case 'birthday':
							value = Number(cf.value);
							break;
						case 'text':
						case 'numeric':
						case 'textarea':
						case 'textarea':
						case 'price':
						case 'streetaddress':
						case 'tracking_data':
						case 'monetary':
						case 'url':
							value = String(cf.value);
							break;
						case 'select':
						case 'multiselect':
						case 'radiobutton':
						case 'category':
							value = String(cf.value);
							enum_id = Number(cf.enum_id);
							enum_code = String(cf.enum_code);
						default:
							break;
					}
					if (!value && !enum_id && !enum_code) return acc;
					const existRecord = acc.filter((el) => el.field_id === data.id);
					if (existRecord.length) {
						const values = [...existRecord[0].values, { value, enum_id, enum_code }];
						acc = [
							...acc.filter((el) => el.field_id !== data.id),
							{ field_id: existRecord[0].field_id, values },
						];
					} else {
						acc.push({ field_id: data.id, values: [{ value }] });
					}
					return acc;
				},
				[],
			),
			_embedded: {
				...lead._embedded,
				tags: lead._embedded?.tags?.flatMap((group) => group.id.map((id) => ({ id }))),
			},
		}))
		.map(clearNullableProps);
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
