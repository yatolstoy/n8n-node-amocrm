import { IExecuteFunctions } from 'n8n-core';

import { INodeExecutionData } from 'n8n-workflow';
import { clearNullableProps } from '../../../helpers/clearNullableProps';

import { apiRequest } from '../../../transport';
import { makeCustomFieldReqObject } from '../../_components/CustomFieldsDescription';

interface IUnsorted<T> {
	source_uid: string;
	source_name: string;
	pipeline_id: number;
	created_at: string;
	metadata: { metadata: T };
	_embedded: {
		contacts: {};
		companies: {};
		leads: {};
	};
}

interface ISipMetadata {
	from?: string;
	phone?: string;
	called_at?: string;
	duration?: number;
	link?: string;
	service_code?: string;
	is_call_event_needed: boolean;
}

interface IFormMetadata {
	form_id?: string;
	form_name?: string;
	form_page?: string;
	ip?: string;
	form_sent_at?: string;
	referer?: string;
}

interface IForm {
	sip?: Array<IUnsorted<ISipMetadata>>;
	form?: Array<IUnsorted<IFormMetadata>>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const sipEndpoint = `leads/unsorted/sip`;
	const formEndpoint = `leads/unsorted/form`;

	const jsonParams = (await this.getNodeParameter('json', 0)) as boolean;

	if (jsonParams) {
		const responseData = [];
		const jsonSip = (await this.getNodeParameter('jsonSip', 0)) as string;
		const jsonForm = (await this.getNodeParameter('jsonForm', 0)) as string;

		if (jsonSip.length) {
			const response = await apiRequest.call(this, requestMethod, sipEndpoint, JSON.parse(jsonSip));
			responseData.push(response);
		}

		if (jsonForm.length) {
			const response = await apiRequest.call(
				this,
				requestMethod,
				formEndpoint,
				JSON.parse(jsonForm),
			);
			responseData.push(response);
		}

		return this.helpers.returnJsonArray(responseData);
	}

	const collection = (await this.getNodeParameter('collection', 0)) as IForm;
	if (collection?.sip?.length) {
		const body = collection.sip.map((unsorted) => ({
			...unsorted,
			metadata: {
				...unsorted.metadata.metadata,
				called_at:
					unsorted.metadata.metadata.called_at &&
					strDateToTimestamp(unsorted.metadata.metadata.called_at),
			},
		}));
	}

	// const body = collection.company
	// 	.map((company) => ({
	// 		...company,
	// 		custom_fields_values:
	// 			company.custom_fields_values && makeCustomFieldReqObject(company.custom_fields_values),
	// 		_embedded: {
	// 			...company._embedded,
	// 			tags: company._embedded?.tags?.flatMap((group) => group.id.map((id) => ({ id }))),
	// 		},
	// 	}))
	// 	.map(clearNullableProps);

	// const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	// return this.helpers.returnJsonArray(responseData);
	return this.helpers.returnJsonArray([]);
}

function strDateToTimestamp(str: string) {
	return Math.ceil(new Date(str).getTime() / 1000);
}
