import axios from 'axios';
const qs = require('qs');
import { baseURL, hash, ts, apikey } from '../utils';
import { orderByDirectory, formatEnum } from '../utils/formatters';

export default class MarvelApiModel {
	marvel;
	constructor() {
		this.marvel = axios.create({
			baseURL
		});
	}
	async createParams(args?: any) {
		return await qs.stringify({ ...args, hash, ts, apikey });
	}
	getFormattedEnum(arg) {
		if (!arg) {
			return null;
		}
		return formatEnum[arg];
	}
	getOrderBy(arg, type) {
		if (!arg) {
			return null;
		}
		return orderByDirectory[type][arg];
	}
}
