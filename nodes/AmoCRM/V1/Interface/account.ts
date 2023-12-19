import { ILinks } from '.';

export interface IAccount {
	id: number;
	name: string;
	subdomain: string;
	created_at: number;
	created_by: number;
	updated_at: number;
	updated_by: number;
	current_user_id: number;
	country: string;
	currency: string;
	currency_symbol: string;
	customers_mode: string;
	is_unsorted_on: boolean;
	mobile_feature_version: number;
	is_loss_reason_enabled: boolean;
	is_helpbot_enabled: boolean;
	is_technical_account: boolean;
	contact_name_display_order: boolean;
	_links: ILinks;
}
