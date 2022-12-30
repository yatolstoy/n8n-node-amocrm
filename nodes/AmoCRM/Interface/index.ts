export * from './user';
export * from './pipeline';
export * from './status';
export * from './leadCustomField';
export * from './lossReason';
export * from './tags';
export * from './lead';

export interface IResponseData<S extends string, T> {
	_total_items: number;
	_page: number;
	_page_count: number;
	_links: ILinks;
	_embedded: IEmbedded<S, T>;
}

type IEmbedded<A extends string, T> = {
	[S in A]: T[];
};

export interface ILinks {
	self: IHref;
	next?: IHref;
	last?: IHref;
}

interface IHref {
	href: string;
}

export interface IStringRange {
	from: string;
	to: string;
}

export interface INumRange {
	from: number;
	to: number;
}
