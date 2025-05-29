import { ICustomFieldValues } from './';

export interface ICatalogElement {
	id: number;
	catalog_id: number;
	name: string;
	created_by: number;
	updated_by: number;
	created_at: number;
	updated_at: number;
	is_deleted: boolean;
	custom_fields_values: ICustomFieldValues[];
	account_id: number;
}
