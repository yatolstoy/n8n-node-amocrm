import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

type MyFunction = (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;

const WAIT_TIME = 300;
const CACHE_TIME = 5 * 1000;

const cache: {
	[key: string]: { lastUpdate: number; data: INodePropertyOptions[]; loading: boolean };
} = {};

export const cacheOptionsRequest = (fnc: MyFunction) => {
	const key = JSON.stringify(fnc.name);

	return async function (this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		if (cache[key]?.loading) {
			await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
			return cacheOptionsRequest(fnc).call(this);
		}

		const cachedData = cache[key];
		if (cachedData && Date.now() < cachedData.lastUpdate + CACHE_TIME) {
			return cachedData.data;
		}

		cache[key] = cache[key] || { lastUpdate: Date.now(), data: [], loading: true };
		cache[key].loading = true;

		try {
			const data = await fnc.call(this);
			cache[key] = { lastUpdate: Date.now(), data, loading: false };
			return data;
		} catch (e) {
			cache[key].loading = false;
			throw e;
		}
	};
};
