import { ILinks } from '.';

interface ILeadsRight {
	view: string;
	edit: string;
	add: string;
	delete: string;
	export: string;
}
interface IContactsRight {
	view: string;
	edit: string;
	add: string;
	delete: string;
	export: string;
}
interface ICompaniesRight {
	view: string;
	edit: string;
	add: string;
	delete: string;
	export: string;
}
interface ITasksRight {
	edit: string;
	delete: string;
}
interface IStatusRight {
	entity_type: string;
	pipeline_id: number;
	status_id: number;
	rights: {
		view: string;
		edit: string;
		delete: string;
		export: string;
	};
}
export interface IAmoUser {
	id: number;
	name: string;
	email: string;
	lang: string;
	rights: {
		leads: ILeadsRight;
		contacts: IContactsRight;
		companies: ICompaniesRight;
		tasks: ITasksRight;
		mail_access: boolean;
		catalog_access: boolean;
		files_access: boolean;
		status_rights: IStatusRight[];
		oper_day_reports_view_access: boolean;
		oper_day_user_tracking: boolean;
		is_admin: boolean;
		is_free: boolean;
		is_active: boolean;
		group_id?: number;
		role_id?: number;
	};
	_links: ILinks;
}
