export type EntityType = 'leads' | 'contacts' | 'companies' | 'customers';

export interface IGeneral {
	id?: number;
	entity_type: EntityType;
	entity_id: number;
	created_by: number;
	is_need_to_trigger_digital_pipeline: boolean;
	request_id: string;
	created_at: string;
}

export interface ICommonNoteParams {
	text: string;
}

export interface ICallInNoteParams {
	uniq: string;
	duration: number;
	source: string;
	link: string;
	phone: string;
	call_responsible: string;
}

export interface ICallOutNoteParams {
	uniq: string;
	duration: number;
	source: string;
	link: string;
	phone: string;
	call_responsible: number;
}

export interface IServiceMessageNoteParams {
	service: string;
	text: string;
}

export interface IExtendedServiceMessageNoteParams {
	service: string;
	text: string;
}

export interface IMessageCashierNoteParams {
	status: string;
	text: string;
}

export interface IGeolocationNoteParams {
	text: string;
	address: string;
	longitude: string;
	latitude: string;
}

export interface ISmsInNoteParams {
	text: string;
	phone: string;
}

export interface ISmsOutNoteParams {
	text: string;
	phone: string;
}

export interface IAttachmentNoteParams {
	version_uuid: string;
	file_uuid: string;
	file_name: string;
}
export interface IFormNote {
	common?: Array<ICommonNoteParams & IGeneral>;
	call_in?: Array<ICallInNoteParams & IGeneral>;
	call_out?: Array<ICallOutNoteParams & IGeneral>;
	service_message?: Array<IServiceMessageNoteParams & IGeneral>;
	message_cashier?: Array<IMessageCashierNoteParams & IGeneral>;
	geolocation?: Array<IGeolocationNoteParams & IGeneral>;
	sms_in?: Array<ISmsInNoteParams & IGeneral>;
	sms_out?: Array<ISmsOutNoteParams & IGeneral>;
	extended_service_message?: Array<IExtendedServiceMessageNoteParams & IGeneral>;
	attachment?: Array<IAttachmentNoteParams & IGeneral>;
}

export type NoteTypes = keyof IFormNote;
