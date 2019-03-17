import * as jwt from "jsonwebtoken";
// import { Prisma } from "../generated/prisma";
import MarvelApiModel from "../models/MarvelApiModel";
import CharacterModel from "../models/CharacterModel";
import ComicModel from "../models/ComicModel";
import CreatorModel from "../models/CreatorModel";
import EventModel from "../models/EventModel";
import SeriesModel from "../models/SeriesModel";
import StoryModel from "../models/StoryModel";
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
