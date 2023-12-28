import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import {
	IAttachmentNoteParams,
	ICallInNoteParams,
	ICallOutNoteParams,
	ICommonNoteParams,
	IExtendedServiceMessageNoteParams,
	IFormNote,
	IGeneral,
	IGeolocationNoteParams,
	IMessageCashierNoteParams,
	IServiceMessageNoteParams,
	ISmsInNoteParams,
	ISmsOutNoteParams,
} from '../interface';
import { apiRequest } from '../../../transport';
import { getTimestampFromDateString } from '../../../helpers/getTimestampFromDateString';
import { clearNullableProps } from '../../../helpers/clearNullableProps';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';

	const endpoint = (await this.getNodeParameter('entity_type', 0)) + '/notes';

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

	const formNotes = (await this.getNodeParameter('notes', 0)) as IFormNote;

	const noteTypes = Object.keys(formNotes) as Array<keyof IFormNote>;

	const body = noteTypes
		.flatMap((noteType) => {
			return formNotes[noteType]?.map((el) => {
				let params, element;
				switch (noteType) {
					case 'attachment':
						element = el as IAttachmentNoteParams & IGeneral;
						params = {
							file_uuid: element.file_uuid,
							file_name: element.file_name,
							version_uuid: element.version_uuid,
						};
						break;
					case 'call_in':
						element = el as ICallInNoteParams & IGeneral;
						params = {
							uniq: element.uniq,
							duration: element.duration,
							source: element.source,
							link: element.link,
							phone: element.phone,
							call_responsible: element.call_responsible,
						};
						break;
					case 'call_out':
						element = el as ICallOutNoteParams & IGeneral;
						params = {
							uniq: element.uniq,
							duration: element.duration,
							source: element.source,
							link: element.link,
							phone: element.phone,
							call_responsible: element.call_responsible,
						};
						break;
					case 'common':
						element = el as ICommonNoteParams & IGeneral;
						params = {
							text: element.text,
						};
						break;
					case 'extended_service_message':
						element = el as IExtendedServiceMessageNoteParams & IGeneral;
						params = {
							text: element.text,
							service: element.service,
						};
						break;
					case 'geolocation':
						element = el as IGeolocationNoteParams & IGeneral;
						params = {
							text: element.text,
							address: element.address,
							longitude: element.longitude,
							latitude: element.latitude,
						};
						break;
					case 'message_cashier':
						element = el as IMessageCashierNoteParams & IGeneral;
						params = {
							status: element.status,
							text: element.text,
						};
						break;
					case 'service_message':
						element = el as IServiceMessageNoteParams & IGeneral;
						params = {
							text: element.text,
							service: element.service,
						};
						break;
					case 'sms_in':
						element = el as ISmsInNoteParams & IGeneral;
						params = {
							text: element.text,
							phone: element.phone,
						};
						break;
					case 'sms_out':
						element = el as ISmsOutNoteParams & IGeneral;
						params = {
							text: element.text,
							phone: element.phone,
						};
						break;

					default:
						break;
				}
				return params
					? {
							entity_id: el.entity_id,
							created_by: el.created_by,
							created_at: getTimestampFromDateString(el.created_at),
							is_need_to_trigger_digital_pipeline: el.is_need_to_trigger_digital_pipeline,
							request_id: el.request_id,
							note_type: noteType,
							params,
					  }
					: undefined;
			});
		})
		.map(clearNullableProps);

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
