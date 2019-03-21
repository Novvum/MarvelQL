import { objectType, enumType, inputObjectType } from "nexus";

export const Comic = objectType({
    name: "Comic",
    definition(t) {
        t.implements("MarvelNode")
        t.int("digitalId", {
            nullable: true,
            description: 'The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally.',
        })
        t.string("title", {
            nullable: true,
            description: 'The canonical title of the comic.',
        })
        t.int("issueNumber", {
            nullable: true,
            description: 'The number of the issue in the series (will generally be 0 for collection formats).',
        })
        t.string("variantDescription", {
            nullable: true,
            description: 'If the issue is a variant (e.g. an alternate cover, second printing, or director’s cut), a text description of the variant.',
        })
        t.string("description", {
            nullable: true,
            description: 'The preferred description of the comic.',
        })
        t.string("isbn", {
            nullable: true,
            description: 'The ISBN for the comic (generally only populated for collection formats).',
        })
        t.string("upc", {
            nullable: true,
            description: 'The UPC barcode number for the comic (generally only populated for periodical formats)',
        })
        t.string("diamondCode", {
            nullable: true,
            description: 'The Diamond code for the comic.',
        })
        t.string("ean", {
            nullable: true,
            description: 'The EAN barcode for the comic.',
        })
        t.string("issn", {
            nullable: true,
            description: 'The ISSN barcode for the comic.',
        })
        t.string("format", {
            nullable: true,
            description: 'The publication format of the comic e.g. comic, hardcover, trade paperback.',
        })
        t.list.field("textObjects", {
            type: "TextObject",
            nullable: true,
            description: 'A set of descriptive text blurbs for the comic.',
        })
        t.list.field("urls", {
            type: "MarvelUrl",
            nullable: true,
            description: 'A set of public web site URLs for the resource.',
        })
        t.field("series", {
            type: "Summary",
            nullable: true,
            description: 'A list of series (Summary Types) to this comic',
        })
        t.list.field("variants", {
            type: "Summary",
            nullable: true,
            description: 'A list of variant issues for this comic (includes the "original" issue if the current issue is a variant)',
        })
        t.list.field("collections", {
            type: "Summary",
            nullable: true,
            description: "A list of collections which include this comic (will generally be empty if the comic's format is a collection).",
        })
        t.list.field("collectedIssues", {
            type: "Summary",
            nullable: true,
            description: 'A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or magazine").',
        })
        t.list.field("dates", {
            type: "ComicDate",
            nullable: true,
            description: 'A list of key dates for this comic.',
        })
        t.list.field("prices", {
            type: "ComicPrice",
            nullable: true,
            description: 'A list of prices for this comic.',
        })
        t.list.field("images", {
            type: "ComicImage",
            nullable: true,
            description: 'A list of promotional images associated with this comic.',
        })
        t.list.field("characters", {
            type: "Summary",
            nullable: true,
            description: 'A list of characters (Summary Types) to this comic',
        })
        t.list.field("events", {
            type: "Summary",
            nullable: true,
            description: 'A list of events (Summary Types) related to this comic',
        })
        t.list.field("stories", {
            type: "Summary",
            nullable: true,
            description: 'A list of stories (Summary Types) related to this comic',
        })
        t.list.field("creators", {
            type: "Summary",
            nullable: true,
            description: 'A list of creators (Summary Types) related to this comic',
        })
    }
})

export const ComicFormat = enumType({
    name: "ComicFormat",
    description: 'Return only series containing one or more comics with the specified format.',
    members: [{ description: 'Return only series containing one or more comics with the specified format of a magazine.', name: 'magazine', value: 'magazine' }, { description: 'Return only series containing one or more comics with the specified format of a trade paperback.', name: 'trade_paperback', value: 'trade_paperback' }, { description: 'Return only series containing one or more comics with the specified format of a hardcover.', name: 'hardcover', value: 'hardcover' }, { description: 'Return only series containing one or more comics with the specified format of a digest.', name: 'digest', value: 'digest' }, { description: 'Return only series containing one or more comics with the specified format of a graphic novel.', name: 'graphic_novel', value: 'graphic_novel' }, { description: 'Return only series containing one or more comics with the specified format of a comic.', name: 'comic', value: 'comic' }, { description: 'Return only series containing one or more comics with the specified format of a digital comic.', name: 'digital_comic', value: 'digital_comic' }, { description: 'Return only series containing one or more comics with the specified format of an infinite comic.', name: 'infinite_comic', value: 'infinite_comic' }],
});
export const ComicFormatType = enumType({
    name: "ComicFormatType",
    description: 'Filter by the issue format type (comic or collection).',
    members: ['comic', 'collection'],
});
export const ComicOrderBy = enumType({
    name: "ComicOrderBy",
    description: 'Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.',
    members: ['focDate_asc', 'onSaleDate_asc', 'title_asc', 'issueNumber_asc', 'modified_asc', 'focDate_desc', 'onSaleDate_desc', 'title_desc', 'issueNumber_desc', 'modified_desc'],
});
export const ComicWhereInput = inputObjectType({
    name: "ComicWhereInput",
    description: 'Optional filters for comics. See notes on individual inputs below.',
    definition(t) {
        t.field("format", {
            type: "ComicFormat",
            description: 'Filter by the issue format (e.g. comic, digital comic, hardcover).',
        });
        t.field("formatType", {
            type: "ComicFormatType",
            description: 'Filter by the issue format type (comic or collection).',
        });
        t.boolean("noVariants", { description: "Exclude variants (alternate covers, secondary printings, director's cuts, etc.) from the result set." });
        t.field("dateDescriptor", {
            type: "DateDescriptor",
            description: 'Return comics within a predefined date range.',
        });
        t.int("dateRange", { description: 'Returns comics within a predefined date range. Dates must be specified as date1,date2 (e.g. 2013-01-01,2013-01-02). Dates are preferably formatted as YYYY-MM-DD but may be sent as any common date format.' });
        t.string("diamondCode", { description: 'Filter by diamond code.' });
        t.int("digitalId", { description: 'Filter by digital comic id.' });
        t.string("upc", { description: 'Filter by UPC.' });
        t.string("isbn", { description: 'Filter by ISBN.' });
        t.string("ean", { description: 'Filter by EAN.' });
        t.string("issn", { description: 'Filter by ISSN.' });
        t.boolean("hasDigitalIssue", { description: 'Include only results which are available digitally.' });
        t.field("modifiedSince", {
            type: "DateTime",
            description: 'Return only comics which have been modified since the specified date.',
        });
        t.list.id("creators", { description: 'Return only comics which feature work by the specified creators (accepts a comma-separated list of ids).' });
        t.list.id("characters", { description: 'Return only comics which feature the specified characters (accepts a comma-separated list of ids).' });
        t.list.id("series", { description: 'Return only comics which are part of the specified series (accepts a comma-separated list of ids).' });
        t.list.id("events", { description: 'Return only comics which take place in the specified events (accepts a comma-separated list of ids).' });
        t.list.id("stories", { description: 'Return only comics which contain the specified stories (accepts a comma-separated list of ids).' });
        t.list.id("sharedAppearances", { description: 'Return only comics in which the specified characters appear together (for example in which BOTH Spider-Man and Wolverine appear). Accepts a comma-separated list of ids.' });
        t.list.id("collaborators", { description: 'Return only comics in which the specified creators worked together (for example in which BOTH Stan Lee and Jack Kirby did work). Accepts a comma-separated list of ids.' });
    }
});
export const ComicDate = objectType({
    name: "ComicDate",
    definition(t) {
        t.string("type", {
            nullable: true,
            description: 'A description of the date (e.g. onsale date, FOC date).',
        })
        t.string("date", {
            nullable: true,
            description: 'The date',
        })
    }
})
export const ComicImage = objectType({
    name: "ComicImage",
    definition(t) {
        t.string("path", {
            nullable: true,
            description: 'A file path to the resources image',
        })
        t.string("extension", {
            nullable: true,
            description: 'The file extension for the resource image',
        })
    }
})
export const ComicPrice = objectType({
    name: "ComicPrice",
    definition(t) {
        t.string("type", {
            nullable: true,
            description: 'A description of the price (e.g. print price, digital price).',
        });
        t.int("price", {
            nullable: true,
            description: 'The price of the comic resource',
        });
    }
});
