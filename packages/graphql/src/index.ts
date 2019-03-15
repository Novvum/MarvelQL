import { ApolloServer } from 'apollo-server';
import MarvelApiModel from '@marvelql/core/src/models/MarvelApiModel';
import { schema } from './resolvers';
import CharacterModel from '@marvelql/core/src/models/CharacterModel';
import ComicModel from '@marvelql/core/src/models/ComicModel';
import CreatorModel from '@marvelql/core/src/models/CreatorModel';
import EventModel from '@marvelql/core/src/models/EventModel';
import SeriesModel from '@marvelql/core/src/models/SeriesModel';
import StoryModel from '@marvelql/core/src/models/StoryModel';

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
		apiKey: 'service:marvelQL:31heDXzZ0JWmMz7L4zCuug'
	},
	playground: { version: '1.7.20' }
});
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
