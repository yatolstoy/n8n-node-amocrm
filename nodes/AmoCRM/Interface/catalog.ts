import { ILinks } from '.';

export interface ICatalog {
	id: number;
	name: string;
	created_by: number;
	updated_by: number;
	created_at: number;
	updated_at: number;
	sort: number;
	type: 'products' | 'regular' | 'invoices';
	can_add_elements: boolean;
	can_show_in_cards: boolean;
	can_link_multiple: boolean;
	can_be_deleted: boolean;
	sdk_widget_code?: number;
	account_id: number;
	_links: ILinks;
}
