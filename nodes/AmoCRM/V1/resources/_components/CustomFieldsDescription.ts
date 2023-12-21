import { INodeProperties } from 'n8n-workflow';
import { ICustomFieldValuesForm, ITypeField } from '../../Interface';
import { isJson } from '../../helpers/isJson';
import { isNumber } from '../../helpers/isNumber';
import { stringToArray } from '../../helpers/stringToArray';

export const addCustomFieldDescription = (loadOptionsMethod: string): INodeProperties => {
	return {
		displayName: 'Custom Fields',
		name: 'custom_fields_values',
		placeholder: 'Add custom field',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Custom Field',
				name: 'custom_field',
				values: [
					{
						displayName: 'Name',
						name: 'data',
						type: 'options',
						typeOptions: {
							loadOptionsMethod,
						},
						default: '',
						required: true,
					},
					// {
					// 	displayName: 'Enum ID',
					// 	name: 'enum_id',
					// 	type: 'number',
					// 	default: null,
					// },
					// {
					// 	displayName: 'Enum Code',
					// 	name: 'enum_code',
					// 	type: 'string',
					// 	default: '',
					// },
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	};
};

export const makeCustomFieldReqObject = (customFieldsValues: ICustomFieldValuesForm) => {
	return customFieldsValues.custom_field?.reduce(
		(
			acc: Array<{
				field_id: number;
				values: Array<{
					value?: number | boolean | string;
					enum_id?: number;
					enum_code?: string;
				}>;
			}>,
			cf,
		) => {
			// tslint:disable-next-line: variable-name
			let value, enum_id, enum_code;
			const data = JSON.parse(cf.data) as { id: number; type: ITypeField };
			if (typeof cf.value === 'object') {
				return [...acc, { field_id: data.id, values: cf.value }];
			}
			if (
				typeof cf.value === 'string' &&
				isJson(cf.value) &&
				!isNumber(cf.value) &&
				typeof JSON.parse(cf.value) !== 'boolean'
			) {
				return [...acc, { field_id: data.id, values: JSON.parse(cf.value) }];
			}

			if (
				typeof cf.value === 'string' &&
				['multiselect', 'radiobutton', 'category'].includes(data.type) &&
				cf.value.split(',').length > 1
			) {
				return [
					...acc,
					{
						field_id: data.id,
						values: stringToArray(cf.value).map((value) =>
							typeof value === 'number' ? { enum_id: value } : { value },
						),
					},
				];
			}

			switch (data.type) {
				case 'checkbox':
					if (
						typeof cf.value === 'string' &&
						['нет', 'no', 'false', 'off'].includes(cf.value.toLowerCase())
					) {
						value = false;
						break;
					}
					value = Boolean(cf.value);
					break;
				case 'date':
					value = Number(cf.value);
					break;
				case 'date_time':
					value = Number(cf.value);
					break;
				case 'birthday':
					value = Number(cf.value);
					break;
				case 'text':
					value = String(cf.value);
					break;
				case 'numeric':
					value = String(cf.value);
					break;
				case 'textarea':
					value = String(cf.value);
					break;
				case 'price':
					value = String(cf.value);
					break;
				case 'streetaddress':
					value = String(cf.value);
					break;
				case 'tracking_data':
					value = String(cf.value);
					break;
				case 'monetary':
					value = String(cf.value);
					break;
				case 'url':
					value = String(cf.value);
					break;
				case 'select':
					if (isNumber(cf.value)) {
						enum_id = Number(cf.value);
					} else {
						value = String(cf.value);
					}
					break;
				case 'multiselect':
					if (isNumber(cf.value)) {
						enum_id = Number(cf.value);
					} else {
						value = String(cf.value);
					}
					break;
				case 'radiobutton':
					if (isNumber(cf.value)) {
						enum_id = Number(cf.value);
					} else {
						value = String(cf.value);
					}
					break;
				case 'category':
					if (isNumber(cf.value)) {
						enum_id = Number(cf.value);
					} else {
						value = String(cf.value);
					}
					break;
				case 'multitext':
					value = String(cf.value);
					break;
				case 'smart_address':
					value = String(cf.value);
					break;
				case 'legal_entity':
					value = JSON.parse(cf.value);
					break;
				case 'items':
					value = JSON.parse(cf.value);
					break;
				case 'linked_entity':
					value = JSON.parse(cf.value);
					break;
				case 'chained_list':
					break;
				case 'file':
					value = JSON.parse(cf.value);
					break;
				case 'payer':
					value = JSON.parse(cf.value);
					break;
				case 'supplier':
					value = JSON.parse(cf.value);
					break;
				default:
					break;
			}
			if (typeof value === 'undefined' && !enum_id && !enum_code) return acc;
			const existRecord = acc.filter((el) => el.field_id === data.id);
			if (existRecord.length) {
				const values = [...existRecord[0].values, { value, enum_id, enum_code }];
				acc = [
					...acc.filter((el) => el.field_id !== data.id),
					{ field_id: existRecord[0].field_id, values },
				];
			} else {
				acc.push({ field_id: data.id, values: [{ value, enum_id, enum_code }] });
			}
			return acc;
		},
		[],
	);
};
