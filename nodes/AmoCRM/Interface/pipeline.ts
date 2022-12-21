import { IStatus } from './index';

export interface IPipeline {
	id: number;
	name: string;
	sort: number;
	is_main: boolean;
	is_unsorted_on: boolean;
	is_archive: boolean;
	account_id: number;
	_embedded: {
		statuses: IStatus[];
	};
}
