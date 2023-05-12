import { IDisplayOptions } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['get'],
	},
};

export const description: IContactsProperties = [
	addPageDescription(displayOptions),
	addLimitDescription(displayOptions),
];
