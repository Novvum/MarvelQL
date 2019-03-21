import MarvelApiModel from "../models/MarvelApiModel";
import CharacterModel from "../models/CharacterModel";
import ComicModel from "../models/ComicModel";
import CreatorModel from "../models/CreatorModel";
import EventModel from "../models/EventModel";
import SeriesModel from "../models/SeriesModel";
import StoryModel from "../models/StoryModel";
import dataImporter from '../../data/src/data';

type DataModel = {
	[key: string]: any;
	add: (key: string, value: any) => any;
}
type CachedData = {
	characters: DataModel;
	comics: DataModel;
	creators: DataModel;
	events: DataModel;
	series: DataModel;
	stories: DataModel;
}

const data = {
	characters: dataImporter("characters"),
	comics: dataImporter("comics"),
	creators: dataImporter("creators"),
	events: dataImporter("events"),
	series: dataImporter("series"),
	stories: dataImporter("stories"),
}

export interface Context {
	// db: Prisma;
	api: MarvelApiModel;
	data: CachedData;
	charactersModel: CharacterModel;
	comicsModel: ComicModel;
	creatorsModel: CreatorModel;
	eventsModel: EventModel;
	seriesModel: SeriesModel;
	storiesModel: StoryModel;
	request: any;
}

export default (req): CachedData => ({
	...req,
	api: new MarvelApiModel(),
	data,
	charactersModel: new CharacterModel(),
	comicsModel: new ComicModel(),
	creatorsModel: new CreatorModel(),
	eventsModel: new EventModel(),
	seriesModel: new SeriesModel(),
	storiesModel: new StoryModel()
})