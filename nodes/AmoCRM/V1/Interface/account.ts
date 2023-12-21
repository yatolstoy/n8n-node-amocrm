import { ILinks } from '.';

export type AccountInfo = {
	/** ID аккаунта */
	id: number;
	/** Название аккаунта */
	name: string;
	/** Субдомен аккаунта */
	subdomain: string;
	/** ID текущего пользователя */
	current_user_id: number;
	/** Страна, указанная в настройках аккаунта */
	country: string;
	/** Режим покупателей. Возможные варианты: unavailable (функционал недоступен), disabled (функцонал отключен), segments (сегментация), dynamic (deprecated), periodicity (периодические покупки) */
	customers_mode: string;
	/** Включен ли функционал “Неразобранного” в аккаунте */
	is_unsorted_on: boolean;
	/** Включен ли функционал причин отказа */
	is_loss_reason_enabled: boolean;
	/** Включен ли функционал Типовых вопросов (доступен только на профессиональном тарифе) */
	is_helpbot_enabled: boolean;
	/** Является ли данный аккаунт техническим */
	is_technical_account: boolean;
	/** Порядок отображения имен контактов (1 – Имя, Фамилия; 2 – Фамилия, Имя) */
	contact_name_display_order: 1 | 2;
	/** Требуется GET параметр with. Уникальный идентификатор аккаунта для работы с сервисом чатов amoJo */
	amojo_id: string;
	/** Требуется GET параметр with. Текущая версия amoCRM */
	version: number;
	/** Требуется GET параметр with. Адрес сервиса файлов для конкретного аккаунта */
	drive_url: string;
	/** Требуется GET параметр with. Включена ли API фильтрация для аккаунта */
	is_api_filter_enabled: boolean;
	created_at: number;
	created_by: number;
	updated_at: number;
	updated_by: number;
	currency: string;
	currency_symbol: string;
	mobile_feature_version: number;
};
export type IAccount = AccountInfo &
	ILinks & {
		_embedded: {
			amojo_rights: {
				can_direct: boolean;
				can_create_groups: boolean;
			};
			users_groups: {
				id: number;
				name: string;
				uuid?: string | null;
			}[];
			task_types: {
				id: number;
				name: string;
				color: string | null;
				icon_id: number | null;
				code: string;
			}[];
			datetime_settings: {
				date_pattern: string;
				short_date_pattern: string;
				short_time_pattern: string;
				date_format: string;
				time_format: string;
				timezone: string;
				timezone_offset: string;
			};
		};
		entity_names: Record<
			string,
			Record<
				string,
				{
					gender: 'm' | 'f';
					singular_form: Partial<{
						dative: string;
						default: string;
						genitive: string;
						accusative: string;
						instrumental: string;
						prepositional: string;
					}>;
					plural_form: Partial<{
						dative: string;
						default: string;
						genitive: string;
						accusative: string;
						instrumental: string;
						prepositional: string;
					}>;
				}
			>
		>;
	};
