import { INodeProperties } from 'n8n-workflow';
import { ICustomFieldValuesForm, ITypeField } from '../../Interface';

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
					{
						displayName: 'Enum ID',
						name: 'enum_id',
						type: 'number',
						default: null,
					},
					{
						displayName: 'Enum Code',
						name: 'enum_code',
						type: 'string',
						default: '',
					},
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
			switch (data.type) {
				case 'checkbox':
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
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
					break;
				case 'multiselect':
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
					break;
				case 'radiobutton':
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
					break;
				case 'category':
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
					break;
				case 'multitext':
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
					value = String(cf.value);
					break;
				case 'smart_address':
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
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
			if (!value && !enum_id && !enum_code) return acc;
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
