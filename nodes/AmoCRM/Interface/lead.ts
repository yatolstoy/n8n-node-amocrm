import { ICustomFieldValues } from './';

export interface ILead {
	name: string;
	price: number;
	status_id: number;
	pipeline_id: number;
	created_by: number;
	updated_by: number;
	closed_at: number;
	created_at: number;
	updated_at: number;
	loss_reason_id: number;
	responsible_user_id: number;
	custom_fields_values: ICustomFieldValues[];
	_embedded: {
		tags: Array<{ id: number }>;
		contacts: Array<{ id: number; is_main: boolean }>;
		companies: Array<{ id: number }>;
		source: {
			external_id: number;
			type: 'widget';
		};
	};
}
