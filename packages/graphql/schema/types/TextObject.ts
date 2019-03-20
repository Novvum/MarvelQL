import { objectType } from 'nexus';
export const TextObject = objectType({
    name: "TextObject",
    definition(t) {
        t.string("type", {
            nullable: true,
            description: 'The canonical type of the text object (e.g. solicit text, preview text, etc.).',
        });
        t.string("language", {
            nullable: true,
            description: 'The IETF language tag denoting the language the text object is written in.',
        });
        t.string("text", {
            nullable: true,
            description: 'The text.',
        });
    }
});
