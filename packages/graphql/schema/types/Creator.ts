import { objectType, enumType, inputObjectType } from 'nexus';

export const Creator = objectType({
    name: "Creator",
    definition(t) {
        t.implements("MarvelNode");
        t.string("firstName", {
            nullable: true,
            description: 'The first name of the creator',
        });
        t.string("middleName", {
            nullable: true,
            description: 'The middle name of the creator',
        });
        t.string("lastName", {
            nullable: true,
            description: 'The last name of the creator',
        });
        t.string("suffix", {
            nullable: true,
            description: 'The suffix of the creator',
        });
        t.string("fullName", {
            nullable: true,
            description: 'The full name of the creator',
        });
        t.list.field("urls", {
            type: "MarvelUrl",
            nullable: true,
            description: 'A set of public web site URLs for the resource.',
        });
        t.list.field("series", {
            type: "Summary",
            nullable: true,
            description: 'A list of series (Summary Types) related to this creator',
        });
        t.list.field("stories", {
            type: "Summary",
            nullable: true,
            description: 'A list of stories (Summary Types) related to this creator',
        });
        t.list.field("comics", {
            type: "Summary",
            nullable: true,
            description: 'A list of comics (Summary Types) related to this creator',
        });
        t.list.field("events", {
            type: "Summary",
            nullable: true,
            description: 'A list of events (Summary Types) related to this creator',
        });
    }
});

export const CreatorOrderBy = enumType({
    name: "CreatorOrderBy",
    description: 'Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.',
    members: ['lastName_asc', 'firstName_asc', 'middleName_asc', 'suffix_asc', 'modified_asc', 'lastName_desc', 'firstName_desc', 'middleName_desc', 'suffix_desc', 'modified_desc'],
});

export const CreatorWhereInput = inputObjectType({
    name: "CreatorWhereInput",
    description: 'Optional filters for creators. See notes on individual inputs below.',
    definition(t) {
        t.string("firstName", { description: 'Filter by creator first name (e.g. Brian).' });
        t.string("middleName", { description: 'Filter by creator middle name (e.g. Michael).' });
        t.string("lastName", { description: 'Filter by creator last name (e.g. Bendis).' });
        t.string("suffix", { description: 'Filter by suffix or honorific (e.g. Jr., Sr.).' });
        t.string("nameStartsWith", { description: 'Filter by creator names that match critera (e.g. B, St L).' });
        t.string("firstNameStartsWith", { description: 'Filter by creator first names that match critera (e.g. B, St L).' });
        t.string("middleNameStartsWith", { description: 'Filter by creator middle names that match critera (e.g. Mi).' });
        t.string("lastNameStartsWith", { description: 'Filter by creator last names that match critera (e.g. Ben).' });
        t.field("modifiedSince", {
            type: "DateTime",
            description: 'Return only creators which have been modified since the specified date.',
        });
        t.list.id("comics", { description: 'Return only creators who worked on in the specified comics (accepts a comma-separated list of ids).' });
        t.list.id("series", { description: 'Return only creators who worked on the specified series (accepts a comma-separated list of ids).' });
        t.list.id("events", { description: 'Return only creators who worked on comics that took place in the specified events (accepts a comma-separated list of ids).' });
        t.list.id("stories", { description: 'Return only creators who worked on the specified stories (accepts a comma-separated list of ids).' });
    }
});
