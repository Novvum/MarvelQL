import { objectType, enumType, inputObjectType } from "nexus";

export const Character = objectType({
    name: "Character",
    definition(t) {
        t.implements("MarvelNode")
        t.string("name", {
            nullable: true,
            description: 'The name of the character.',
        })
        t.string("description", {
            nullable: true,
            description: 'A short bio or description of the character.',
        })
        t.list.field("urls", {
            type: "MarvelUrl",
            nullable: true,
            description: 'A set of public web site URLs for the resource.',
        })
        t.list.field("comics", {
            type: "Comic",
            nullable: true,
            description: 'Lists of comics filtered by a character id.',
            async resolve(parent: any, args, ctx) {
                return (await parent.comics).map(async comic => {
                    if (comic.resourceURI) {
                        if (ctx.data.comics[comic.resourceURI]) {
                            // console.log("hit");
                            return ctx.data.comics[comic.resourceURI]
                        } else {
                            // console.log("miss");
                            const c = await ctx.comicsModel.getById(comic.resourceURI.split("/").pop())
                            ctx.data.comics.add(comic.resourceURI, c)
                            return c;
                        }
                    }
                    return comic;
                });
            }
        })
        t.list.field("series", {
            type: "Summary",
            nullable: true,
            description: 'Lists of series filtered by a character id.',
        })
        t.list.field("events", {
            type: "Summary",
            nullable: true,
            description: 'Lists of events filtered by a character id.',
        })
        t.list.field("stories", {
            type: "Summary",
            nullable: true,
            description: 'Lists of stories filtered by a character id.',
        })
    }
})

export const CharacterOrderBy = enumType({
    name: "CharacterOrderBy",
    description: 'Orders the result set by a field or fields. Multiple values are given priority in the order in which they are passed.',
    members: [{ description: 'Returns character in A-Z order (i.e 3-D Man, A-Bomb (HAS), A.I.M, etc...)', name: 'name_asc', value: 'name_asc' }, { description: 'Returns character in Z-A order (i.e , etc...)', name: 'name_desc', value: 'name_desc' }, { description: "Returns character's modification date in ascending order", name: 'modified_asc', value: 'modified_asc' }, { description: "Returns character's modification date in descending order", name: 'modified_desc', value: 'modified_desc' }],
});
export const CharacterWhereInput = inputObjectType({
    name: "CharacterWhereInput",
    description: 'Optional filters for characters. See notes on individual inputs below.',
    definition(t) {
        t.int("id", { description: 'Returns only characters matching the specified id' });
        t.string("name", { description: 'Returns only characters matching the specified full character name (e.g. Spider-Man).' });
        t.string("nameStartsWith", { description: 'Returns characters with names that begin with the specified string (e.g. Sp).' });
        t.string("modifiedSince", { description: 'Returns only characters which have been modified since the specified date.' });
        t.list.id("comics", { description: 'Returns only characters which appear in the specified comics (accepts a comma-separated list of ids).' });
        t.list.id("series", { description: 'Returns only characters which appear the specified series (accepts a comma-separated list of ids).' });
        t.list.id("events", { description: 'Returns only characters which appear in the specified events (accepts a comma-separated list of ids).' });
        t.list.id("stories", { description: 'Returns only characters which appear the specified stories (accepts a comma-separated list of ids).' });
    }
});
