import {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class amocrmLongLivedApi implements ICredentialType {
	name = 'amocrmLongLivedApi';
	displayName = 'Amocrm Long Lived Token API';
	documentationUrl = 'https://amocrm.ru/developers';
	icon = 'file:amocrm_logo.svg';
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
			displayName: 'Long term API key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: `=https://{{$credentials.subdomain}}.amocrm.ru/api/v4/`,
			url: 'account',
		},
	};

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		requestOptions.headers = { authorization: `Bearer ${credentials.apiKey}` };
		return requestOptions;
	}
}
