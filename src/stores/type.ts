export interface ChinaTotal {
	deadAdd: number;
	confirm: number;
	heal: number;
	suspect: number;
	importedCase: number;
	localConfirmH5: number;
	mRiskTime: string;
	dead: number;
	noInfect: number;
	local_acc_confirm: number;
	localConfirmAdd: number;
	localConfirm: number;
	mtime: string;
	nowConfirm: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	localWzzAdd: number;
	confirmAdd: number;
	nowLocalWzz: number;
	nowSevere: number;
	noInfectH5: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
}

export interface ChinaAdd {
	nowConfirm: number;
	nowSevere: number;
	noInfectH5: number;
	localConfirm: number;
	localConfirmH5: number;
	confirm: number;
	heal: number;
	dead: number;
	suspect: number;
	importedCase: number;
	noInfect: number;
}

export interface ShowAddSwitch {
	all: boolean;
	confirm: boolean;
	dead: boolean;
	heal: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	suspect: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	localinfeciton: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	confirm: number;
	showRate: boolean;
	heal: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	wzz: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	dead: number;
	showHeal: boolean;
	adcode: string;
}

export interface Today {
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
}

export interface Total {
	continueDayZeroConfirmAdd: number;
	confirm: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	continueDayZeroConfirm: number;
	mtime: string;
	adcode: string;
	nowConfirm: number;
	highRiskAreaNum: number;
	heal: number;
	wzz: number;
	mediumRiskAreaNum: number;
	dead: number;
	showRate: boolean;
}
export interface Today {
	wzz_add: number;
	local_confirm_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	confirm: number;
	showHeal: boolean;
	continueDayZeroLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	dead: number;
	provinceLocalConfirm: number;
	heal: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	adcode: string;
	showRate: boolean;
	wzz: number;
	mtime: string;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	province: string;
	nowConfirm: number;
	confirmAdd: number;
	dead: number;
	grade: string;
	city: string;
	confirm: number;
	heal: number;
	date: string;
	mtime: string;
	sdate: string;
	syear: number;
	wzz_add: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}