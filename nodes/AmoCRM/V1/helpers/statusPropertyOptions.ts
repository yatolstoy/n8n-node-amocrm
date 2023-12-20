import { INodePropertyOptions } from 'n8n-workflow';
import { IStatus } from '../Interface';

export const statusPropertyOptions = (s: IStatus): INodePropertyOptions => ({
	name: `${s.name} (${s.pipeline_name})`,
	value: s.id,
});
