import MarvelApiModel from './MarvelApiModel';
import { formatThumbnail, getSummary } from '../utils/formatters';
import { NexusGenInputs, NexusGenEnums } from "../schema/typegen";

export default class EventModel extends MarvelApiModel {
	constructor() {
		super();
	}
	async getOne(where: NexusGenInputs["EventsWhereInput"]) {
		try {
			const params = await this.createParams({
				...where
			});
			const response = await this.marvel.get(`/events?${params}`);
			return await this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getById(id: any) {
		try {
			const params = await this.createParams();
			const response = await this.marvel.get(`/events/${id}?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: NexusGenInputs["EventsWhereInput"],
		orderBy: NexusGenEnums["EventsOrderBy"],
		offset: number,
		limit: number
	) {
		try {
			const params = await this.createParams({
				...where,
				orderBy: this.getOrderBy(orderBy, 'events'),
				offset,
				limit
			});
			const response = await this.marvel.get(`/events?${params}`);
			return await response.data.data.results.map((item) =>
				this.formatApiData(item)
			);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	formatApiData(item) {
		return {
			...item,
			thumbnail: formatThumbnail(item.thumbnail),
			series: getSummary['series'](item),
			comics: getSummary['comics'](item),
			stories: getSummary['stories'](item),
			characters: getSummary['characters'](item),
			creators: getSummary['creators'](item)
		};
	}
}
