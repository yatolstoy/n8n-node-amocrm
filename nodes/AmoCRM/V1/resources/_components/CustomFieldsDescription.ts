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
				case 'date_time':
				case 'birthday':
					value = Number(cf.value);
					break;
				case 'text':
				case 'numeric':
				case 'textarea':
				case 'textarea':
				case 'price':
				case 'streetaddress':
				case 'tracking_data':
				case 'monetary':
				case 'url':
					value = String(cf.value);
					break;
				case 'select':
				case 'multiselect':
				case 'radiobutton':
				case 'category':
					value = String(cf.value);
					enum_id = Number(cf.enum_id);
					enum_code = String(cf.enum_code);
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
				acc.push({ field_id: data.id, values: [{ value }] });
			}
			return acc;
		},
		[],
	);
};
