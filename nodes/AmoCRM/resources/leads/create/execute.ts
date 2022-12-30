import { IExecuteFunctions } from 'n8n-core';

import { INodeExecutionData } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';
import { ICustomFieldValuesForm } from '../../../Interface';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';

interface IFormLead {
	lead: Array<{
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
			contacts?: Array<{
				id: {
					contact: Array<{
						id: number;
						isMain: boolean;
					}>;
				};
			}>;
			companies?: Array<{
				id: {
					company: Array<{
						id: number;
					}>;
				};
			}>;
			source?: Array<{
				external_id: number;
				type: string;
			}>;
		};
	}>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
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
			custom_fields_values:
				lead.custom_fields_values && makeCustomFieldReqObject(lead.custom_fields_values),
			_embedded: {
				...lead._embedded,
				tags: lead._embedded?.tags?.flatMap((group) => group.id.map((id) => ({ id }))),
				contacts: lead._embedded?.contacts?.flatMap((group) =>
					group.id.contact.flatMap((contact) => contact),
				),
				companies: lead._embedded?.companies?.flatMap((group) =>
					group.id.company.flatMap((company) => company),
				),
				source: lead._embedded?.source?.filter((_, i) => i === 0),
			},
		}))
		.map(clearNullableProps);
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
