import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

type MyFunction = (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;

export const cacheOptionsRequest = (fnc: MyFunction) => {
	const WAIT_TIME = 300;
	const CACHE_TIME = 5 * 1000;

	const cache: { lastUpdate: number; data: INodePropertyOptions[]; loading: boolean } = {
		lastUpdate: 0,
		data: [],
		loading: false,
	};

	const fn = async function (this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		if (cache.loading) {
			await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
			return fn.call(this);
		}
		if (Date.now() < cache.lastUpdate + CACHE_TIME) {
			return cache.data;
		}
		cache.loading = true;
		const data = await fnc.call(this);

		cache.data = data;
		cache.lastUpdate = Date.now();
		cache.loading = false;

		return data;
	};
	return fn;
};
