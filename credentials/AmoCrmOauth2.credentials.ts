import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AmoCrmOauth2 implements ICredentialType {
	name = 'amocrmOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'AmoCRM OAuth2 API';
	documentationUrl = 'amocrm';
	icon = 'file:amocrm_logo.png';
	properties: INodeProperties[] = [
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			placeholder: 'mycompany',
			description: 'Just subdomain. Without .amocrm.ru.',
			required: true,
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://www.amocrm.ru/oauth',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '=https://{{$self["subdomain"]}}.amocrm.ru/oauth2/access_token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			placeholder: '********-****-****-****-************',
			description: 'ID integration from your AmoCRM account.',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			default: '****************************************',
			description: 'Secret key from your integration in your amocrm account',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: 'grant_type=authorization_code',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
