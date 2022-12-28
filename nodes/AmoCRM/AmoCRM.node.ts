import { IExecuteFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { router } from './resources/router';
import * as account from './resources/account';
import * as leads from './resources/leads';
import * as unsorted from './resources/unsorted';

import * as loadOptions from './methods';

export class AmoCRM implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AmoCRM',
		name: 'amoCrm',
		icon: 'file:amocrm_logo.png',
		group: ['transform'],
		version: 1,
		description: 'Consume AmoCRM API',
		defaults: {
			name: 'AmoCRM',
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
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Leads',
						value: 'leads',
					},
					{
						name: 'Unsorted',
						value: 'unsorted',
					},
				],
				default: 'account',
				noDataExpression: true,
				required: true,
				description: 'Select resource',
			},
			...account.descriptions,
			...leads.descriptions,
			...unsorted.descriptions,
		],
	};

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return router.call(this);
	}
}
