import MarvelApiModel from './MarvelApiModel';
import { StoriesWhereInput, StoriesOrderBy } from '../utils';
import { formatThumbnail, getSummary } from '../utils/formatters';

export default class StoryModel extends MarvelApiModel {
	constructor() {
		super();
	}
	async getOne(where: StoriesWhereInput) {
		try {
			const params = await this.createParams({
				...where
			});
			const response = await this.marvel.get(`/stories?${params}`);
			return await this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getById(id: any) {
		try {
			const params = await this.createParams();
			const response = await this.marvel.get(`/stories/${id}?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: StoriesWhereInput,
		orderBy: StoriesOrderBy,
		offset: number,
		limit: number
	) {
		try {
			const params = await this.createParams({
				...where,
				orderBy: this.getOrderBy(orderBy, 'stories'),
				offset,
				limit
			});
			const response = await this.marvel.get(`/stories?${params}`);
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
			events: getSummary['events'](item),
			comics: getSummary['comics'](item),
			stories: getSummary['stories'](item),
			characters: getSummary['characters'](item),
			creators: getSummary['creators'](item)
		};
	}
}
