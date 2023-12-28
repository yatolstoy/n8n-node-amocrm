import { IDataObject } from 'n8n-workflow';

export function clearNullableProps(obj?: IDataObject | null): IDataObject | undefined {
	if (!obj) return undefined;
	return Object.keys(obj).reduce((acc: IDataObject, key) => {
		const val = obj[key];
		//check array on empty
		if (Array.isArray(val) && !val.length) {
			return acc;
		}
		//check object on empty
		if (val && typeof val === 'object') {
			const prop = clearNullableProps(val as IDataObject);
			if (prop && Object.keys(prop).length) acc[key] = prop;
			return acc;
		}
		//check nullable props on empty
		if (!!val || typeof val === 'boolean') {
			acc[key] = obj[key];
		}
		return acc;
	}, {});
}
