import { enumType } from 'nexus';

export const DateDescriptor = enumType({
    name: "DateDescriptor",
    description: 'Returns a resource within a predefined date range.',
    members: ['lastWeek', 'thisWeek', 'nextWeek', 'thisMonth'],
});