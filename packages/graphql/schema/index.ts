import * as path from 'path';
import { makeSchema } from 'nexus';
import * as types from './types';

export const schema = makeSchema({
	types,
	outputs: {
		schema: path.join(__dirname, "./schema.graphql"),
		typegen: path.join(__dirname, "./typegen.ts"),
	},
	typegenAutoConfig: {
		contextType: "ctx.Context",
		sources: [
			{
				alias: "ctx",
				source: path.join(__dirname, "../utils/getContext.ts"),
			}
		],
		backingTypeMap: {
			Date: "Date",
		},
	},
})
