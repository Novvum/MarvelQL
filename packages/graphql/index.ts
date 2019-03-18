import { ApolloServer } from 'apollo-server';
import MarvelApiModel from './models/MarvelApiModel';
import { schema } from './resolvers';
import CharacterModel from './models/CharacterModel';
import ComicModel from './models/ComicModel';
import CreatorModel from './models/CreatorModel';
import EventModel from './models/EventModel';
import SeriesModel from './models/SeriesModel';
import StoryModel from './models/StoryModel';
import config from './config';

const server = new ApolloServer({
	schema,
	context: (req) => ({
		...req,
		api: new MarvelApiModel(),
		charactersModel: new CharacterModel(),
		comicsModel: new ComicModel(),
		creatorsModel: new CreatorModel(),
		eventsModel: new EventModel(),
		seriesModel: new SeriesModel(),
		storiesModel: new StoryModel()
	}),
	engine: {
		apiKey: config.ENGINE_API_KEY,
	},
	playground: { version: '1.7.20' },
	introspection: true
});
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
