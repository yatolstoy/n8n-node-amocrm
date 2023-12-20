import { ILoadOptionsFunctions, INodePropertyOptions, NodeOperationError } from 'n8n-workflow';
import {
	IAccount,
	IAmoUser,
	ICatalog,
	ICatalogElement,
	ICustomField,
	ILossReason,
	IPipeline,
	IResponseData,
	IStatus,
	ITag,
} from '../Interface';
import { apiRequest, apiRequestAllItems } from '../transport';
import { statusPropertyOptions } from '../helpers/statusPropertyOptions';

export async function getPipelines(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await apiRequest.call(this, 'GET', 'leads/pipelines', {});

	if (!responseData?._embedded?.pipelines) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return (
		responseData?._embedded?.pipelines.map(
			(pipeline: IPipeline): INodePropertyOptions => ({
				name: `${pipeline.name} ${pipeline.is_main ? '(main)' : ''}`,
				value: pipeline.id,
			}),
		) || []
	);
}

async function getAllStatuses(this: ILoadOptionsFunctions): Promise<IStatus[]> {
	const pipelinesResponseData = await apiRequest.call(this, 'GET', 'leads/pipelines', {});
	if (!pipelinesResponseData?._embedded?.pipelines) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}
	const resultArray: IStatus[] = [];
	for (const pipeline of pipelinesResponseData._embedded.pipelines) {
		const responseData = await apiRequest.call(
			this,
			'GET',
			`leads/pipelines/${pipeline.id}/statuses`,
			{},
		);
		const statuses: IStatus[] = responseData?._embedded?.statuses.map((s: IStatus) => ({
			...s,
			pipeline_name: pipeline.name,
		}));
		if (statuses) resultArray.push(...statuses);
	}
	return resultArray;
}

export async function getStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const statuses = await getAllStatuses.call(this);
	if (statuses) return statuses.map(statusPropertyOptions);
	return [];
}

export async function getStatusesWithoutUnsorted(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const statuses = await getAllStatuses.call(this);
	return [
		{ name: 'Not Selected', value: 0 },
		...statuses.filter((s) => !s.type).map(statusPropertyOptions),
	];
}

export async function getCatalogs(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const catalogsResponseData = await apiRequestAllItems.call(this, 'GET', 'catalogs', {});
	return catalogsResponseData.flatMap((data) => {
		if (!data?._embedded?.catalogs) return [];
		return data._embedded.catalogs.map((catalog: ICatalog) => ({
			name: catalog.name,
			value: catalog.id,
		}));
	});
}

export async function getCatalogElements(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const catalogId = await this.getNodeParameter('catalog_id', 0);
	const elementsResponseData = await apiRequestAllItems.call(
		this,
		'GET',
		`catalogs/${catalogId}/elements`,
		{},
	);
	return elementsResponseData.flatMap((data) => {
		if (!data?._embedded?.elements) return [];
		return data._embedded.elements.map((el: ICatalogElement) => ({
			name: el.name,
			value: el.id,
		}));
	});
}

export async function getActiveUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const usersResponseDatas: Array<IResponseData<'users', IAmoUser>> = await apiRequestAllItems.call(
		this,
		'GET',
		'users',
		{},
	);

	const users = usersResponseDatas.reduce((acc: IAmoUser[], response) => {
		acc.push(...response._embedded.users);
		return acc;
	}, []);

	if (!users?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return users
		.filter((user) => user.rights.is_active)
		.map((user) => ({
			name: user.name,
			value: user.id,
		}));
}

export async function getActiveUsersWithRobot(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const users = await getActiveUsers.call(this);
	return [{ name: 'Not Selected', value: 0 }, ...users];
}

export async function getLeadCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `leads/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getContactCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `contacts/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getCompanyCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `companies/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getCustomerCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `customers/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getCustomerSegmentCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `customers/segments/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getCatalogCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const catalog_id = await this.getNodeParameter('catalog_id', 0);

	if (!catalog_id) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `catalogs/${catalog_id}/custom_fields`, {});

	const customFields = cfResponseData.reduce((acc: ICustomField[], response) => {
		acc.push(...response._embedded.custom_fields);
		return acc;
	}, []);

	if (!customFields?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return customFields.map((field) => ({
		name: `${field.name} (${field.type})`,
		value: JSON.stringify({ id: field.id, type: field.type }),
	}));
}

export async function getLossReasons(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const accSettingsData: IAccount = await apiRequest.call(this, 'GET', 'account', {});
	if (!accSettingsData.is_loss_reason_enabled) return [];

	const lrResponseData: Array<IResponseData<'loss_reasons', ILossReason>> =
		await apiRequestAllItems.call(this, 'GET', 'leads/loss_reasons', {});

	const lossReasons = lrResponseData.reduce((acc: ILossReason[], response) => {
		acc.push(...response._embedded.loss_reasons);
		return acc;
	}, []);

	if (!lossReasons?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return lossReasons.map((field) => ({
		name: field.name,
		value: field.id,
	}));
}

export async function getSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const sources = await apiRequest.call(this, 'GET', 'sources', {});
	return [];
}

export async function getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const resource = await this.getNodeParameter('resource', 0);

	if (!resource) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const tagsResponseData: Array<IResponseData<'tags', ITag>> = await apiRequestAllItems.call(
		this,
		'GET',
		`${resource}/tags`,
		{},
	);

	const tags = tagsResponseData.reduce((acc: ITag[], response) => {
		if (!response?._embedded) return acc;
		acc.push(...response._embedded?.tags);
		return acc;
	}, []);

	if (!tags?.length) {
		return [];
	}

	return tags.map((field) => ({
		name: field.name.length > 30 ? `${field.name.slice(0, 30)}...` : field.name,
		value: field.id,
	}));
}
