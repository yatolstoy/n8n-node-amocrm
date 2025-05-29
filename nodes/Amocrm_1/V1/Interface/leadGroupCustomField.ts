import { ILinks } from '.';
import { ITypeField } from './leadCustomField';

export interface IGroupCustomField {
	id: string;
	name: string;
	is_predefined: boolean;
	type: ITypeField;
	fields: number[];
	entity_type: string;
	sort: number;
	_links: ILinks;
}
