export const categorySchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "string" },
            name: { type: "string" },
            subcategories: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        uuid: { type: "string" },
                        name: { type: "string" }
                    },
                    required: ["uuid", "name"]
                }
            }
        },
        required: ["id", "name", "subcategories"]
    }
};
