// storeSchema.ts
export const storeJsonSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            type: { type: "string" },
            id: { type: "number" },
            lat: { type: "number" },
            lon: { type: "number" },
            tags: {
                type: "object",
                additionalProperties: { type: "string" }
            }
        },
        required: ["type", "id", "lat", "lon", "tags"]
    }
};
