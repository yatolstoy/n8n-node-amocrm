export interface ITaskModelForm {
	text: string;
	complete_till: string;
	responsible_user_id: number;
	entity_type: 'contacts' | 'leads' | 'companies' | 'customers';
	entity_id: string;
	is_completed: boolean;
	task_type: number;
	duration: string;
	resultText: string;
	created_by: number;
	updated_by: number;
	created_at: string;
	updated_at: string;
}
export interface IFormTask {
	task: Array<ITaskModelForm>;
}

export interface IUpdateTaskForm {
	task: Array<ITaskModelForm & { id: number }>;
}

export type Task = {
	/** ID задачи */
	id: number;
	/** ID пользователя, создавшего задачу */
	created_by: number;
	/** ID пользователя, изменившего задачу */
	updated_by: number;
	/** Дата создания задачи, передается в Unix Timestamp */
	created_at: number;
	/** Дата изменения задачи, передается в Unix Timestamp */
	updated_at: number;
	/** ID пользователя, ответственного за задачу */
	responsible_user_id: number;
	/** ID группы, в которой состоит ответственны пользователь за задачу */
	group_id: number;
	/** ID сущности, к которой привязана задача */
	entity_id: number;
	/** Тип сущности, к которой привязана задача */
	entity_type: string;
	/** Выполнена ли задача */
	is_completed: boolean;
	/** Тип задачи */
	task_type_id: number;
	/** Описание задачи */
	text: string;
	/** Длительность задачи в секундах */
	duration: number;
	/** Дата, когда задача должна быть завершена, передается в Unix Timestamp */
	complete_till: number;
	/** Результат выполнения задачи */
	result: {
		/** Текст результата выполнения задачи */
		text: string;
	};
	/** ID аккаунта, в котором находится задача */
	account_id: number;
};

export type RequestTaskUpdate = Partial<Exclude<Task, 'id'>> & Pick<Task, 'id'>;
export type RequestTaskCreate = Partial<Exclude<Task, 'id'>> & Pick<Task, 'text' | 'complete_till'>;
