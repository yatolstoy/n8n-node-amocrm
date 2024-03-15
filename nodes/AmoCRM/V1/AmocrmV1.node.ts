/* eslint-disable n8n-nodes-base/node-filename-against-convention */
/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import {
	IExecuteFunctions,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as loadOptions from './methods';
import { router } from './resources/router';

import * as account from './resources/account';
import * as contacts from './resources/contacts';
import * as leads from './resources/leads';
import * as tasks from './resources/tasks';
import * as companies from './resources/companies';
import * as notes from './resources/notes';
import * as catalogs from './resources/catalogs';

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
						{
							name: 'Catalog',
							value: 'catalogs',
						},
						{
							name: 'Company',
							value: 'companies',
						},
						{
							name: 'Contact',
							value: 'contacts',
						},
						{
							name: 'Lead',
							value: 'leads',
						},
						{
							name: 'Note',
							value: 'notes',
						},
						{
							name: 'Task',
							value: 'tasks',
						},
					],
					default: 'account',
				},
				...account.descriptions,
				...companies.descriptions,
				...contacts.descriptions,
				...leads.descriptions,
				...tasks.descriptions,
				...notes.descriptions,
				...catalogs.descriptions,
			],
		};
	}

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return router.call(this);
	}
}
