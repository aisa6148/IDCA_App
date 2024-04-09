export interface IFrontEndComponent {
	componentID: string;
	componentType: string;
	fields?: IField[];
}

export interface IFrontEndPage {
	pageID: string;
	pageName: string;
	pageParentId?: string;
	pageType?: string;
	pageVersion?: number;
	componentList: IFrontEndComponent[];
	description: string;
}

export interface IField {
	fieldID: string;
	fieldType: string;
	fieldContent: any;
}

export interface IFrontEndPagePositioning {
	pagePositioningID: string;
	appHomeItemListTopHeader: IPagePositioningFields[];
	appHomeItemListBottomFooter: IPagePositioningFields[];
}

export interface IPagePositioningFields {
	pageID: string;
	pageName: string;
	pageIcon: string;
	slot: string;
}
