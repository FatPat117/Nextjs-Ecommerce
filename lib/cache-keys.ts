export function createProductsCacheKey(params: {
        categorySlug?: string;
        page?: number;
        limit?: number;
        sort?: string | null;
        search?: string;
}) {
        const { categorySlug, page, limit, sort, search } = params;
        const keyParts = ["products"];

        if (categorySlug) {
                keyParts.push(`category:${categorySlug}`);
        }

        if (page) {
                keyParts.push(`page:${page}`);
        }

        if (limit) {
                keyParts.push(`limit:${limit}`);
        }

        if (sort) {
                keyParts.push(`sort:${sort}`);
        }

        if (search) {
                keyParts.push(`search:${search}`);
        }

        return keyParts.join(":");
}

export function createProductsTags(params: { categorySlug?: string; search?: string }) {
        const { categorySlug, search } = params;
        const tags = ["products"];

        if (categorySlug) {
                tags.push(`category:${categorySlug}`);
        }

        if (search) {
                tags.push(`search:${search}`);
        }
        return tags;
}
