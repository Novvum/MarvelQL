import MarvelApiModel from './MarvelApiModel';
import { optionalChaining } from '../utils';
import { formatThumbnail, getSummary } from '../utils/formatters';
import { NexusGenInputs, NexusGenEnums } from "../schema/typegen";


export default class ComicModel extends MarvelApiModel {
	constructor() {
		super();
	}
	getWhereArgs(where) {
		const format = optionalChaining(() => where.format)
			? this.getFormattedEnum(where.format)
			: null;
		const formatType = optionalChaining(() => where.formatType)
			? this.getFormattedEnum(where.formatType)
			: null;
		let input = { ...where };
		if (format) {
			input.format = format;
		}
		if (formatType) {
			input.formatType = formatType;
		}
		return input;
	}
	async getOne(where: NexusGenInputs["ComicWhereInput"]) {
		try {
			const input = this.getWhereArgs(where);
			const params = await this.createParams({
				...input
			});

			const response = await this.marvel.get(`/comics?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getById(id: any) {
		try {
			const params = await this.createParams();
			const response = await this.marvel.get(`/comics/${id}?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: NexusGenInputs["ComicWhereInput"],
		orderBy: NexusGenEnums["ComicOrderBy"],
		offset: number,
		limit: number
	) {
		const input = this.getWhereArgs(where);
		const params = await this.createParams({
			...input,
			orderBy: this.getOrderBy(orderBy, 'comics'),
			offset,
			limit
		});
		const response = await this.marvel.get(`/comics?${params}`);
		return await response.data.data.results.map((comic) =>
			this.formatApiData(comic)
		);
	}
	catch(error) {
		console.error(error);
		throw new Error(error);
	}
	formatApiData(comic) {
		return {
			...comic,
			thumbnail: formatThumbnail(comic.thumbnail),
			characters: getSummary['characters'](comic),
			events: getSummary['events'](comic),
			creators: getSummary['creators'](comic),
			stories: getSummary['stories'](comic)
		};
	}
}
