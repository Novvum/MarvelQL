import MarvelApiModel from './MarvelApiModel';
import { formatThumbnail, getSummary } from '../utils/formatters';
import { NexusGenInputs, NexusGenEnums } from "../schema/typegen";
export default class CreatorModel extends MarvelApiModel {
	constructor() {
		super();
	}
	async getOne(where: NexusGenInputs["CreatorWhereInput"]) {
		try {
			const params = await this.createParams({
				...where
			});
			const response = await this.marvel.get(`/creators?${params}`);
			return await this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getById(id: any) {
		try {
			const params = await this.createParams();
			const response = await this.marvel.get(`/creators/${id}?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: NexusGenInputs["CreatorWhereInput"],
		orderBy: NexusGenEnums["CreatorOrderBy"],
		offset: number,
		limit: number
	) {
		try {
			const params = await this.createParams({
				...where,
				orderBy: this.getOrderBy(orderBy, 'creators'),
				offset,
				limit
			});
			const response = await this.marvel.get(`/creators?${params}`);
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
			events: getSummary['events'](item)
		};
	}
}
