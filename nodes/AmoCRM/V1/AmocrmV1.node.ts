/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import {
	IExecuteFunctions,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as loadOptions from './methods';
import { router } from './resources/router';

// import { router } from './resources/router';
// import * as account from './resources/account';
// import * as leads from './resources/leads';
// import * as contacts from './resources/contacts';
// import * as companies from './resources/companies';
// import * as unsorted from './resources/unsorted';
// import * as pipelines from './resources/pipelines';
// import * as statuses from './resources/statuses';
// import * as catalogs from './resources/catalogs';

// import * as loadOptions from './methods';

// export class AmoCrm implements INodeType {
// 	description: INodeTypeDescription = {
// 		displayName: 'AmoCRM',
// 		name: 'amoCrm',
// 		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
// 		icon: 'file:amocrm_logo.png',
// 		group: ['transform'],
// 		version: 1,
// 		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
// 		description: 'Consume AmoCRM API',
// 		defaults: {
// 			name: 'AmoCrm',
// 		},
// 		inputs: ['main'],
// 		outputs: ['main'],
// 		credentials: [
// 			{
// 				name: 'amocrmOAuth2Api',
// 				required: true,
// 			},
// 		],
// 		properties: [
// 			// {
// 			// 	displayName: 'Resource',
// 			// 	name: 'resource',
// 			// 	type: 'options',
// 			// 	options: [
// 			// 		{
// 			// 			name: 'Account',
// 			// 			value: 'account',
// 			// 		},
// 			// 		{
// 			// 			name: 'Catalog',
// 			// 			value: 'catalogs',
// 			// 		},
// 			// 		{
// 			// 			name: 'Company',
// 			// 			value: 'companies',
// 			// 		},
// 			// 		{
// 			// 			name: 'Contact',
// 			// 			value: 'contacts',
// 			// 		},
// 			// 		{
// 			// 			name: 'Lead',
// 			// 			value: 'leads',
// 			// 		},
// 			// 		{
// 			// 			name: 'Pipeline',
// 			// 			value: 'pipelines',
// 			// 		},
// 			// 		{
// 			// 			name: 'Status',
// 			// 			value: 'statuses',
// 			// 		},
// 			// 		{
// 			// 			name: 'Unsorted',
// 			// 			value: 'unsorted',
// 			// 		},
// 			// 	],
// 			// 	default: 'account',
// 			// 	noDataExpression: true,
// 			// 	required: true,
// 			// 	description: 'Select resource',
// 			// },
// 			// ...account.descriptions,
// 			// ...leads.descriptions,
// 			// ...unsorted.descriptions,
// 			// ...contacts.descriptions,
// 			// ...companies.descriptions,
// 			// ...pipelines.descriptions,
// 			// ...statuses.descriptions,
// 			// ...catalogs.descriptions,
// 		],
// 	};

// 	methods = { loadOptions };

// 	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
// 		return router.call(this);
// 	}
// }

export class AmocrmV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			displayName: 'Amocrm',
			name: 'amocrm',
			icon: 'file:amocrm_logo.svg',
			group: ['output'],
			version: 1,
			subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
			description: 'Consume AmoCRM API',
			defaults: {
				name: 'AmoCRM API Node',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'amocrmOAuth2Api',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					noDataExpression: true,
					options: [
						{
							name: 'Account',
							value: 'account',
						},
					],
					default: 'account',
				},
			],
		};
	}

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return router.call(this);
	}
}
