import crypto from 'crypto';
export type DateTime = Date | string;

export const ts = Date.now();

export const baseURL = 'https://gateway.marvel.com/v1/public';

export const apikey =
	process.env.PRISMA_MARVEL_API_KEY || '07812287fdfb880f5ebdbf1e5b9fce53';

const privateKey =
	process.env.PRISMA_MARVEL_PRIVATE_KEY ||
	'e23c321aab355ba04371c1e50cef43823ab35752';
const data = `${ts}${privateKey}${apikey}`;

export function optionalChaining(func) {
	try {
		return func();
	} catch (e) {
		return undefined;
	}
}

export const hash = crypto
	.createHash('md5')
	.update(data)
	.digest('hex');

export interface CharacterWhereInput {
	id?: any;
	name?: string;
	nameStartsWith?: string;
	modifiedSince?: DateTime;
	comics?: number[];
	series?: number[];
	events?: number[];
	stories?: number[];
}

export enum CharacterOrderBy {
	name_asc,
	name_desc,
	modified_asc,
	modified_desc
}

export enum ComicOrderBy {
	focDate_asc,
	onSaleDate_asc,
	title_asc,
	issueNumber_asc,
	modified_asc,
	focDate_desc,
	onSaleDate_desc,
	title_desc,
	issueNumber_desc,
	modified_desc
}

export enum CreatorOrderBy {
	lastName_asc,
	firstName_asc,
	middleName_asc,
	suffix_asc,
	modified_asc,
	lastName_desc,
	firstName_desc,
	middleName_desc,
	suffix_desc,
	modified_desc
}

export enum EventsOrderBy {
	name_asc,
	startDate_asc,
	modified_asc,
	name_desc,
	startDate_desc,
	modified_desc
}

export enum SeriesOrderBy {
	title_asc,
	modified_asc,
	startYear_asc,
	title_desc,
	modified_desc,
	startYear_desc
}

export enum StoriesOrderBy {
	id_asc,
	id_desc,
	modified_asc,
	modified_desc
}

export enum ComicFormat {
	magazine,
	trade_paperback,
	hardcover,
	digest,
	graphic_novel,
	comic,
	digital_comic,
	infinite_comic
}

export enum SeriesType {
	collection,
	one_shot,
	limited,
	ongoing
}

export enum ComicFormatType {
	comic,
	collection
}

export interface ComicWhereInput {
	format?: ComicFormat;
	formatType?: ComicFormatType;
	noVariants?: boolean;
	dateDescriptor?: string;
	dateRange?: number;
	diamondCode?: string;
	digitalId?: number;
	upc?: string;
	isbn?: string;
	ean?: string;
	issn?: string;
	hasDigitalIssue?: boolean;
	modifiedSince?: DateTime;
	creators?: number;
	characters?: number;
	series?: number;
	stories?: number;
	sharedAppearances?: number;
	collaborators?: number;
}

export interface CreatorWhereInput {
	firstName?: string;
	middleName?: string;
	lastName?: string;
	suffix?: string;
	nameStartsWith?: string;
	firstNameStartsWith?: string;
	middleNameStartsWith?: string;
	lastNameStartsWith?: string;
	modifiedSince?: DateTime;
	comics?: number;
	series?: number;
	events?: number;
	stories?: number;
}

export interface EventsWhereInput {
	name?: string;
	nameStartsWith?: string;
	modifiedSince?: DateTime;
	creators?: number;
	characters?: number;
	series?: number;
	comics?: number;
}

export interface SeriesWhereInput {
	title?: string;
	titleStartsWith?: string;
	startYear?: number;
	modifiedSince?: DateTime;
	comics?: number;
	stories?: number;
	events?: number;
	creators?: number;
	characters?: number;
	seriesType?: SeriesType;
	contains?: ComicFormat;
}

export interface StoriesWhereInput {
	modifiedSince?: DateTime;
	comics?: number;
	series?: number;
	events?: number;
	creators?: number;
	characters?: number;
}
