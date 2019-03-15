import { Query } from './Query';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import * as path from 'path';
import { GraphQLDateTime } from 'graphql-iso-date';

const resolvers = {
	Query,
	DateTime: GraphQLDateTime
};

export const schema: any = makeExecutableSchema({
	typeDefs: importSchema(path.join(__dirname, '../schema.graphql')),
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	} as any
});
