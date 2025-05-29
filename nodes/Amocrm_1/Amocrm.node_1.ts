import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from 'n8n-workflow';
import { AmocrmV1 } from './V1/AmocrmV1.node';

export class Amocrm extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Amocrm',
			name: 'amocrm',
			icon: 'file:amocrm_logo.svg',
			group: ['output'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Sends data to AmoCrm',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new AmocrmV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
