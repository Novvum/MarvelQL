import MarvelApiModel from './MarvelApiModel';
import { SeriesWhereInput, SeriesOrderBy, optionalChaining } from '../utils';
import { formatThumbnail, getSummary } from '../utils/formatters';

export default class SeriesModel extends MarvelApiModel {
	constructor() {
		super();
	}
	getWhereArgs(where) {
		const seriesType = optionalChaining(() => where.seriesType)
			? this.getFormattedEnum(where.seriesType)
			: null;
		const contains = optionalChaining(() => where.contains)
			? this.getFormattedEnum(where.contains)
			: null;
		let input = { ...where };
		if (seriesType) {
			input.seriesType = seriesType;
		}
		if (contains) {
			input.contains = contains;
		}
		return input;
	}
	async getOne(where: SeriesWhereInput) {
		try {
			const input = this.getWhereArgs(where);
			const params = await this.createParams({
				...input
			});

			const response = await this.marvel.get(`/series?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getById(id: any) {
		try {
			const params = await this.createParams();
			const response = await this.marvel.get(`/series/${id}?${params}`);
			return this.formatApiData(response.data.data.results[0]);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}
	async getMany(
		where: SeriesWhereInput,
		orderBy: SeriesOrderBy,
		offset: number,
		limit: number
	) {
		const input = this.getWhereArgs(where);
		const params = await this.createParams({
			...input,
			orderBy: this.getOrderBy(orderBy, 'series'),
			offset,
			limit
		});
		const response = await this.marvel.get(`/series?${params}`);
		return await response.data.data.results.map((item) =>
			this.formatApiData(item)
		);
	}
	catch(error) {
		console.error(error);
		throw new Error(error);
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
