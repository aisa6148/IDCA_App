export interface IFrontEndPlan {
	planID: string;
	planName: string;
	planParentId?: string;
	planType?: string;
	planVersion?: number;
	taskList: IFrontEndTask[];
	watch: boolean;
	description: string;
}

export interface IFrontEndTask {
	taskID: string;
	taskName: string;
	taskType: string;
	taskVersion?: number;
	templateID?: string;
	duration: number;
	fields?: IField[];
	mediaList?: IMedia[];
	mandatory: boolean;
}
export interface IField {
	fieldID: string;
	fieldType: string;
	fieldLabel: string;
	fieldContent: any;
}
export interface IMedia {
	mediaID: string;
	mediaName?: string;
	contentSize?: number;
	mimeType?: string;
}
