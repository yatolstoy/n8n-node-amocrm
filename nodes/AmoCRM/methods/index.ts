import { ILoadOptionsFunctions, INodePropertyOptions, NodeOperationError } from 'n8n-workflow';
import {
	IAmoUser,
	ICustomField,
	ILossReason,
	IPipeline,
	IResponseData,
	IStatus,
	ITag,
} from '../Interface';
import { apiRequest, apiRequestAllItems } from '../transport';

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

export async function getStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const pipelinesResponseData = await apiRequest.call(this, 'GET', 'leads/pipelines', {});

	if (!pipelinesResponseData?._embedded?.pipelines) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const resultArray: INodePropertyOptions[] = [];
	for (const pipeline of pipelinesResponseData._embedded.pipelines) {
		const responseData = await apiRequest.call(
			this,
			'GET',
			`leads/pipelines/${pipeline.id}/statuses`,
			{},
		);
		const statuses: IStatus[] = responseData?._embedded?.statuses;
		if (statuses) {
			statuses.forEach((status: IStatus) => {
				resultArray.push({
					name: `${status.name} (${pipeline.name})`,
					value: status.id,
				});
			});
		}
	}

	return resultArray;
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

export async function getCustomFields(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const resource = await this.getNodeParameter('resource', 0);

	if (!resource) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	const cfResponseData: Array<IResponseData<'custom_fields', ICustomField>> =
		await apiRequestAllItems.call(this, 'GET', `${resource}/custom_fields`, {});

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
		acc.push(...response._embedded.tags);
		return acc;
	}, []);

	if (!tags?.length) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	return tags.map((field) => ({
		name: field.name.length > 30 ? `${field.name.slice(0, 30)}...` : field.name,
		value: field.id,
	}));
}
