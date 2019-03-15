import * as jwt from "jsonwebtoken";
// import { Prisma } from "../generated/prisma";
import MarvelApiModel from "@marvelql/core/src/models/MarvelApiModel";
import CharacterModel from "@marvelql/core/src/models/CharacterModel";
import ComicModel from "@marvelql/core/src/models/ComicModel";
import CreatorModel from "@marvelql/core/src/models/CreatorModel";
import EventModel from "@marvelql/core/src/models/EventModel";
import SeriesModel from "@marvelql/core/src/models/SeriesModel";
import StoryModel from "@marvelql/core/src/models/StoryModel";
export interface Context {
	// db: Prisma;
	api: MarvelApiModel;
	charactersModel: CharacterModel;
	comicsModel: ComicModel;
	creatorsModel: CreatorModel;
	eventsModel: EventModel;
	seriesModel: SeriesModel;
	storiesModel: StoryModel;
	request: any;
}

export function getUserId(ctx: Context) {
	const Authorization = ctx.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
			userId: string;
		};
		return userId;
	}

	throw new AuthError();
}

export class AuthError extends Error {
	constructor() {
		super("Not authorized");
	}
}
