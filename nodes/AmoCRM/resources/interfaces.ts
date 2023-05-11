import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type IAmoMap = {
	account: 'getInfo';
	leads: 'get' | 'create' | 'update';
	contacts: 'get' | 'create' | 'update';
	companies: 'get' | 'create' | 'update';
	unsorted: 'get' | 'create' | 'accept' | 'link' | 'reject' | 'summary';
	pipelines: 'get' | 'create' | 'update' | 'remove';
	statuses: 'get' | 'create' | 'update' | 'remove';
};

export type IAmo = AllEntities<IAmoMap>;

export type IAccountAmo = Entity<IAmoMap, 'account'>;
export type ILeadsAmo = Entity<IAmoMap, 'leads'>;
export type IContactsAmo = Entity<IAmoMap, 'contacts'>;
export type ICompaniesAmo = Entity<IAmoMap, 'companies'>;
export type IUnsortedAmo = Entity<IAmoMap, 'unsorted'>;
export type IPipelinesAmo = Entity<IAmoMap, 'pipelines'>;
export type IStatusesAmo = Entity<IAmoMap, 'statuses'>;

export type IAccountProperties = PropertiesOf<IAccountAmo>;
export type ILeadsProperties = PropertiesOf<ILeadsAmo>;
export type IContactsProperties = PropertiesOf<IContactsAmo>;
export type ICompaniesProperties = PropertiesOf<ICompaniesAmo>;
export type IUnsortedProperties = PropertiesOf<IUnsortedAmo>;
export type IPipelinesProperties = PropertiesOf<IPipelinesAmo>;
export type IStatusesProperties = PropertiesOf<IStatusesAmo>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
