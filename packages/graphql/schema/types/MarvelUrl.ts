import { objectType } from 'nexus';
export const MarvelUrl = objectType({
    name: "MarvelUrl",
    definition(t) {
        t.string("type", {
            nullable: true,
            description: 'A text identifier for the URL.',
        });
        t.string("url", {
            nullable: true,
            description: 'A full URL (including scheme, domain, and path).',
        });
    }
});
