export const productJsonSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            category: { type: 'string' },
            subcategory: { type: 'string' }
        },
        required: ['id', 'name', 'category', 'subcategory']
    }
};
