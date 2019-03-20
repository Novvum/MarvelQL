import { objectType, inputObjectType, enumType } from 'nexus';
export const Event = objectType({
    name: "Event",
    definition(t) {
        t.implements("MarvelNode");
        t.string("title", {
            nullable: true,
            description: 'The title of the event.',
        });
        t.string("description", {
            nullable: true,
            description: 'A description of the event.',
        });
        t.list.field("urls", {
            type: "MarvelUrl",
            nullable: true,
            description: 'A set of public web site URLs for the resource.',
        });
        t.string("start", {
            nullable: true,
            description: 'The date of publication of the first issue in this event.',
        });
        t.string("end", {
            nullable: true,
            description: 'The date of publication of the last issue in this event.',
        });
        t.list.field("series", {
            type: "Summary",
            nullable: true,
            description: 'A list of series (Summary Types) related to this event',
        });
        t.list.field("stories", {
            type: "Summary",
            nullable: true,
            description: 'A list of stories (Summary Types) related to this event',
        });
        t.list.field("comics", {
            type: "Summary",
            nullable: true,
            description: 'A list of comics (Summary Types) related to this event',
        });
        t.list.field("characters", {
            type: "Summary",
            nullable: true,
            description: 'A list of characters (Summary Types) related to this event',
        });
        t.list.field("creators", {
            type: "Summary",
            nullable: true,
            description: 'A list of creators (Summary Types) related to this event',
        });
        t.field("next", {
            type: "Summary",
            nullable: true,
            description: 'The next event (Summary Type) in relation to this event',
        });
        t.field("previous", {
            type: "Summary",
            nullable: true,
            description: 'The previous event (Summary Type) in relation to this event',
        });
    }
});
export const EventsWhereInput = inputObjectType({
    name: "EventsWhereInput",
    description: 'Optional filters for events. See notes on individual inputs below.',
    definition(t) {
        t.string("name", { description: 'Return only events which match the specified name.' });
        t.string("nameStartsWith", { description: 'Return events with names that begin with the specified string (e.g. Sp).' });
        t.field("modifiedSince", {
            type: "DateTime",
            description: 'Return only events which have been modified since the specified date.',
        });
        t.list.id("creators", { description: 'Return only events which feature work by the specified creators (accepts a comma-separated list of ids).' });
        t.list.id("characters", { description: 'Return only events which feature the specified characters (accepts a comma-separated list of ids).' });
        t.list.id("series", { description: 'Return only events which are part of the specified series (accepts a comma-separated list of ids).' });
        t.list.id("comics", { description: 'Return only events which take place in the specified comics (accepts a comma-separated list of ids).' });
    }
});
export const EventsOrderBy = enumType({
    name: "EventsOrderBy",
    description: 'Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.',
    members: ['name_asc', 'startDate_asc', 'modified_asc', 'name_desc', 'startDate_desc', 'modified_desc'],
});
