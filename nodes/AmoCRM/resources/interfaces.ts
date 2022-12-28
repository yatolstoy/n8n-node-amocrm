import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type IAmoMap = {
	account: 'getInfo';
	leads: 'getList' | 'create' | 'update';
	unsorted: 'get';
};

export type IAmo = AllEntities<IAmoMap>;

export type IAccountAmo = Entity<IAmoMap, 'account'>;
export type ILeadsAmo = Entity<IAmoMap, 'leads'>;
export type IUnsortedAmo = Entity<IAmoMap, 'unsorted'>;

export type IAccountProperties = PropertiesOf<IAccountAmo>;
export type ILeadsProperties = PropertiesOf<ILeadsAmo>;
export type IUnsortedProperties = PropertiesOf<IUnsortedAmo>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
