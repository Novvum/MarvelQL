import { objectType, arg, intArg } from 'nexus';
import config from '../../config';
export const Query = objectType({
    name: "Query",
    definition(t) {
        t.list.field("characters", {
            type: "Character",
            nullable: true,
            description: 'Fetches a list of characters.',
            args: {
                where: arg({ type: "CharacterWhereInput" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
                orderBy: arg({ type: "CharacterOrderBy" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.charactersModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            },
        });
        t.field("getCharacter", {
            type: "Character",
            nullable: true,
            description: 'Fetches a single character by id.',
            args: {
                where: arg({ type: "CharacterWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.charactersModel.getOne(args.where);
            },
        });
        t.list.field("comics", {
            type: "Comic",
            nullable: true,
            description: 'Fetches a list of comics.',
            args: {
                where: arg({ type: "ComicWhereInput" }),
                orderBy: arg({ type: "ComicOrderBy" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.comicsModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            },
        });
        t.field("getComic", {
            type: "Comic",
            nullable: true,
            description: 'Fetches a single comic by id.',
            args: {
                where: arg({ type: "ComicWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.comicsModel.getOne(args.where);
            }
        });
        t.list.field("creators", {
            type: "Creator",
            nullable: true,
            description: 'Fetches a list of creators.',
            args: {
                where: arg({ type: "CreatorWhereInput" }),
                orderBy: arg({ type: "CreatorOrderBy" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.creatorsModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            }
        });
        t.field("getCreator", {
            type: "Creator",
            nullable: true,
            description: 'Fetches a single creator by id.',
            args: {
                where: arg({ type: "CreatorWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.creatorsModel.getOne(args.where);
            },
        });
        t.list.field("events", {
            type: "Event",
            nullable: true,
            description: 'Fetches a list of events.',
            args: {
                where: arg({ type: "EventsWhereInput" }),
                orderBy: arg({ type: "EventsOrderBy" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.eventsModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            },
        });
        t.field("getEvent", {
            type: "Event",
            nullable: true,
            description: 'Fetches a single event by id.',
            args: {
                where: arg({ type: "EventsWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.eventsModel.getOne(args.where);
            },
        });
        t.list.field("series", {
            type: "Series",
            nullable: true,
            description: 'Fetches a list of series.',
            args: {
                where: arg({ type: "SeriesWhereInput" }),
                orderBy: arg({ type: "SeriesOrderBy" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.seriesModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            },
        });
        t.field("getSeries", {
            type: "Series",
            nullable: true,
            description: 'Fetches a single series by id.',
            args: {
                where: arg({ type: "SeriesWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.seriesModel.getOne(args.where);
            },
        });
        t.list.field("stories", {
            type: "Story",
            nullable: true,
            description: 'Fetches a list of stories.',
            args: {
                where: arg({ type: "StoriesWhereInput" }),
                orderBy: arg({ type: "StoriesOrderBy" }),
                offset: intArg({ description: "Skips the specified number of resources in the result set." }),
                limit: intArg({ description: "Limit the result set to the specified number of resources." }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.storiesModel.getMany(
                    args.where,
                    args.orderBy,
                    args.limit,
                    args.offset
                );
            }
        });
        t.field("getStory", {
            type: "Story",
            nullable: true,
            description: 'Fetches a single story by id.',
            args: {
                where: arg({ type: "StoriesWhereInput" }),
            },
            async resolve(_, args, ctx, info) {
                return await ctx.storiesModel.getOne(args.where);
            },
        });
        t.string("engineInfo", {
            nullable: true,
            resolve(_, args, ctx, info) {
                return JSON.stringify(config.engine)
            }
        });
    }
});
