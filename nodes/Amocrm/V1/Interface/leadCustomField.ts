import { ILinks } from '.';

export interface ICustomField {
	id: number;
	name: string;
	type: ITypeField;
	account_id: number;
	code: string;
	sort: number;
	is_api_only: boolean;
	enums: Enum[];
	group_id: string;
	required_statuses: RequiredStatus[];
	is_deletable: boolean;
	is_predefined: boolean;
	entity_type: string;
	_links: ILinks;
}

interface Enum {
	id: number;
	value: string;
	sort: number;
}

interface RequiredStatus {
	pipeline_id: number;
	status_id: number;
}

export type ITypeField =
	| 'text'
	| 'numeric'
	| 'checkbox'
	| 'select'
	| 'multiselect'
	| 'date'
	| 'url'
	| 'textarea'
	| 'radiobutton'
	| 'streetaddress'
	| 'smart_address'
	| 'birthday'
	| 'legal_entity'
	| 'date_time'
	| 'tracking_data'
	| 'chained_list'
	| 'monetary'
	| 'file'
	| 'price'
	| 'category'
	| 'multitext'
	| 'items'
	| 'linked_entity'
	| 'payer'
	| 'supplier';

export interface ICustomFieldValuesForm {
	custom_field: Array<{
		data: string;
		value: string;
		// enum_id: number; enum_code: string
	}>;
}
