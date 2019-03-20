import MarvelApiModel from "./MarvelApiModel";
import { NexusGenInputs, NexusGenEnums } from "../schema/types";
import { formatThumbnail, getSummary } from "../utils/formatters";

export default class CharacterModel extends MarvelApiModel {
	constructor() {
		super();
	}
	async getOne(where: NexusGenInputs['CharacterWhereInput']) {
		try {
			const params = await this.createParams({
				...where
			});

			const response = await this.marvel.get(`/characters?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: NexusGenInputs['CharacterWhereInput'],
		orderBy: NexusGenEnums["CharacterOrderBy"],
		offset: number,
		limit: number
	) {
		try {
			const params = await this.createParams({
				...where,
				orderBy: this.getOrderBy(orderBy, "characters"),
				offset,
				limit
			});

			const response = await this.marvel.get(`/characters?${params}`);
			return response.data.data.results.map((item) => this.formatApiData(item));
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	formatApiData(item) {
		return {
			...item,
			thumbnail: formatThumbnail(item.thumbnail),
			comics: getSummary["comics"](item),
			events: getSummary["events"](item),
			series: getSummary["series"](item),
			stories: getSummary["stories"](item)
		};
	}
}
