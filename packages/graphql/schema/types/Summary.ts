import { objectType } from 'nexus';
export const Summary = objectType({
    name: "Summary",
    definition(t) {
        t.string("resourceURI", {
            nullable: true,
            description: 'The canonical URL identifier for this summary resource.',
        });
        t.string("name", { nullable: true });
        t.string("role", { nullable: true });
        t.string("type", { nullable: true });
    }
});
