import { ICustomFieldValuesForm } from '../../Interface';

export interface ICatalogModelForm {
	name: string;
	type: 'regular' | 'invoices' | 'products';
	sort: number;
	can_add_elements: boolean;
	can_link_multiple: boolean;
	request_id: string;
}
export interface IFormCatalog {
	catalog: Array<ICatalogModelForm>;
}

export interface ICatalogElementModelForm {
	name: string;
	custom_fields_values: ICustomFieldValuesForm;
}

export interface IFormCatalogElement {
	element: Array<ICatalogElementModelForm>;
}

export interface IUpdateCatalogForm {
	catalog: Array<ICatalogModelForm & { id: number }>;
}

export interface IUpdateCatalogElementForm {
	element: Array<ICatalogElementModelForm & { id: number }>;
}

export type Catalog = {
	id: number;
	name: string;
	sort: number;
	type: string;
	can_add_elements: boolean;
	can_link_multiple: boolean;
	request_id: string;
};

export type CatalogElement = {
	id: number;
	name: string;
	custom_fields_values: Record<string, unknown>[];
};

export type RequestCatalogUpdate = Partial<Exclude<Catalog, 'id'>> & Pick<Catalog, 'id'>;
export type RequestCatalogCreate = Partial<Exclude<Catalog, 'id' | 'sort' | 'type'>> &
	Pick<Catalog, 'name'>;

export type RequestCatalogElementUpdate = Partial<Exclude<CatalogElement, 'id'>> &
	Pick<CatalogElement, 'id'>;
export type RequestCatalogElementCreate = Partial<Exclude<CatalogElement, 'id'>> &
	Pick<CatalogElement, 'name'>;
