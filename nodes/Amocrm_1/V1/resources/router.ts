import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { IAmo } from './interfaces';

import * as account from './account';
import * as contacts from './contacts';
import * as leads from './leads';
import * as tasks from './tasks';
import * as companies from './companies';
import * as notes from './notes';
import * as catalogs from './catalogs';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<IAmo>('resource', i);
		const operation = this.getNodeParameter('operation', i);

		const amo = {
			resource,
			operation,
		} as IAmo;

		try {
			if (amo.resource === 'account') {
				responseData = await account[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'contacts') {
				responseData = await contacts[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'leads') {
				responseData = await leads[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'tasks') {
				responseData = await tasks[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'companies') {
				responseData = await companies[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'notes') {
				responseData = await notes[amo.operation].execute.call(this, i);
			} else if (amo.resource === 'catalogs') {
				responseData = await catalogs[amo.operation].execute.call(this, i);
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [operationResult];
}
