import { optionalChaining } from ".";

export const formatConnection = {
	comics: async (results: any) =>
		await results.map(async (comic: any) => {
			return await {
				...comic,
				thumbnail: formatThumbnail(comic.thumbnail),
				characters: await getSummary["characters"](comic),
				events: await getSummary["events"](comic),
				creators: await getSummary["creators"](comic),
				stories: await getSummary["stories"](comic)
			};
		}),
	characters: async (results: any) =>
		await results.map(async (item: any) => {
			return await {
				...item,
				thumbnail: formatThumbnail(item.thumbnail),
				comics: await getSummary["comics"](item),
				events: await getSummary["events"](item),
				series: await getSummary["series"](item),
				stories: await getSummary["stories"](item)
			};
		}),
	series: async (results: any) =>
		await results.map(async (item: any) => {
			return await {
				...item,
				thumbnail: formatThumbnail(item.thumbnail),
				events: await getSummary["events"](item),
				comics: await getSummary["comics"](item),
				stories: await getSummary["stories"](item),
				characters: await getSummary["characters"](item),
				creators: await getSummary["creators"](item)
			};
		}),
	events: async (results: any) =>
		await results.map(async (item: any) => {
			return await {
				...item,
				thumbnail: formatThumbnail(item.thumbnail),
				series: await getSummary["series"](item),
				comics: await getSummary["comics"](item),
				stories: await getSummary["stories"](item),
				characters: await getSummary["characters"](item),
				creators: await getSummary["creators"](item)
			};
		}),
	creators: async (results: any) =>
		await results.map(async (item: any) => {
			return await {
				...item,
				thumbnail: formatThumbnail(item.thumbnail),
				series: await getSummary["series"](item),
				comics: await getSummary["comics"](item),
				stories: await getSummary["stories"](item),
				events: await getSummary["events"](item)
			};
		}),
	stories: async (results: any) =>
		await results.map(async (item: any) => {
			return await {
				...item,
				thumbnail: formatThumbnail(item.thumbnail),
				comics: await getSummary["comics"](item),
				series: await getSummary["series"](item),
				events: await getSummary["events"](item),
				characters: await getSummary["characters"](item),
				creators: await getSummary["creators"](item)
			};
		})
};
export const formatThumbnail = (thumbnail: any) => {
	if (optionalChaining(() => thumbnail.path)) {
		const { path, extension } = thumbnail;
		return `${path}.${extension}`;
	}
	return null;
};

export const getSummary = {
	comics: async (c: { comics: { items: { map: (arg0: (comic: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.comics)
			? c.comics.items.map((comic: any) => ({
				...comic
			}))
			: null,
	series: async (c: { series: { items: { map: (arg0: (s: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.series)
			? c.series.items.map((s: any) => ({
				...s
			}))
			: null,
	events: async (c: { events: { items: { map: (arg0: (event: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.events)
			? c.events.items.map((event: any) => ({
				...event
			}))
			: null,
	stories: async (c: { stories: { items: { map: (arg0: (story: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.stories)
			? c.stories.items.map((story: any) => ({
				...story
			}))
			: null,
	characters: async (c: { characters: { items: { map: (arg0: (ch: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.characters)
			? c.characters.items.map((ch: any) => ({
				...ch
			}))
			: null,
	creators: async (c: { creators: { items: { map: (arg0: (creator: any) => any) => void; }; }; }) =>
		optionalChaining(() => c.creators)
			? c.creators.items.map((creator: any) => ({
				...creator
			}))
			: null
};

export const orderByDirectory = {
	characters: {
		name_asc: "name",
		name_desc: "-name",
		modified_asc: "modified",
		modified_desc: "-modified"
	},
	comics: {
		focDate_asc: "focDate",
		onSaleDate_asc: "onsaleDate",
		title_asc: "title",
		issueNumber_asc: "issueNumber",
		modified_asc: "modified",
		focDate_desc: "-focDate",
		onSaleDate_desc: "-onsaleDate",
		title_desc: "-title",
		issueNumber_desc: "-issueNumber",
		modified_desc: "-modified"
	},
	creators: {
		lastName_asc: "lastName",
		firstName_asc: "firstName",
		middleName_asc: "middleName",
		suffix_asc: "suffix",
		modified_asc: "modified",
		lastName_desc: "-lastName",
		firstName_desc: "-firstName",
		middleName_desc: "-middleName",
		suffix_desc: "-suffix",
		modified_desc: "-modified"
	},
	events: {
		name_asc: "name",
		startDate_asc: "startDate",
		modified_asc: "modified",
		name_desc: "-name",
		startDate_desc: "-startDate",
		modified_desc: "-modified"
	},
	series: {
		title_asc: "title",
		modified_asc: "modified",
		startYear_asc: "startYear",
		title_desc: "-title",
		modified_desc: "-modified",
		startYear_desc: "-startYear"
	},
	stories: {
		id_desc: "-id",
		id_asc: "id",
		modified_asc: "modified",
		modified_desc: "-modified"
	}
};

export const formatEnum = {
	magazine: "magazine",
	trade_paperback: "trade paperback",
	hardcover: "hardcover",
	digest: "digest",
	graphic_novel: "graphic novel",
	comic: "comic",
	digital_comic: "digital comic",
	infinite_comic: "infinite comic",
	collection: "collection",
	one_shot: "one shot",
	limited: "limited",
	ongoing: "ongoing"
};
