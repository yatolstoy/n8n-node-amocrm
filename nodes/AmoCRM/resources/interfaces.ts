import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type IAmoMap = {
	account: 'getInfo';
	leads: 'getList';
	// channel: 'addUser' | 'create' | 'delete' | 'members' | 'restore' | 'statistics' | 'search';
	// message: 'delete' | 'post' | 'postEphemeral';
	// reaction: 'create' | 'delete' | 'getAll';
	// user: 'create' | 'deactive' | 'getAll' | 'getByEmail' | 'getById' | 'invite';
};

export type IAmo = AllEntities<IAmoMap>;

export type IAccountAmo = Entity<IAmoMap, 'account'>;
export type ILeadsAmo = Entity<IAmoMap, 'leads'>;
// export type MattermostChannel = Entity<MattermostMap, 'channel'>;
// export type MattermostMessage = Entity<MattermostMap, 'message'>;
// export type MattermostReaction = Entity<MattermostMap, 'reaction'>;
// export type MattermostUser = Entity<MattermostMap, 'user'>;

export type IAccountProperties = PropertiesOf<IAccountAmo>;
export type ILeadsProperties = PropertiesOf<ILeadsAmo>;
// export type ChannelProperties = PropertiesOf<MattermostChannel>;
// export type MessageProperties = PropertiesOf<MattermostMessage>;
// export type ReactionProperties = PropertiesOf<MattermostReaction>;
// export type UserProperties = PropertiesOf<MattermostUser>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
