import { IDisplayOptions } from 'n8n-workflow';
import { IContactsProperties } from '../../interfaces';
import { addCatalogSelector } from '../../_components/CatalogSelector';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['catalogs'],
		operation: ['getById'],
	},
};

export const description: IContactsProperties = [addCatalogSelector(displayOptions)];
