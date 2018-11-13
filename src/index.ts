import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from './generated/prisma';
import MarvelApiModel from './models/MarvelApiModel';
import { schema, fragmentReplacements } from './resolvers';
import CharacterModel from './models/CharacterModel';
import ComicModel from './models/ComicModel';
import CreatorModel from './models/CreatorModel';
import EventModel from './models/EventModel';
import SeriesModel from './models/SeriesModel';
import StoryModel from './models/StoryModel';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	schema,
	context: (req) => ({
		...req,
		db: new Prisma({
			endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
			debug: true, // log all GraphQL queries & mutations sent to the Prisma API
			secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
			fragmentReplacements
		}),
		api: new MarvelApiModel(),
		charactersModel: new CharacterModel(),
		comicsModel: new ComicModel(),
		creatorsModel: new CreatorModel(),
		eventsModel: new EventModel(),
		seriesModel: new SeriesModel(),
		storiesModel: new StoryModel()
	})
});
server.start(() => console.log(`Server is running on http://localhost:4000`));