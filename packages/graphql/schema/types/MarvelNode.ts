import { interfaceType } from 'nexus';
export const MarvelNode = interfaceType({
    name: "MarvelNode",
    description: 'An interface for common patterns found from the Marvel API',
    definition(t) {
        t.id("id", {
            nullable: true,
            description: 'A unique ID to a particular marvel resource.',
        });
        t.string("resourceURI", {
            nullable: true,
            description: 'The canonical URL identifier for a resource.',
        });
        t.string("thumbnail", {
            nullable: true,
            description: 'The url path for a canonical photo to the resource',
        });
        t.string("modified", {
            nullable: true,
            description: 'A date for which the resource has been modified',
        });
        t.resolveType(() => null);
    }
});
