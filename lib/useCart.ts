import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export function useCart() {
        const { data, isLoading, error } = useSWR("/api/cart", fetcher, {
                fallbackData: {
                        itemCount: 0,
                },
        });
        return {
                itemCount: data?.itemCount ?? 0,
                isLoading,
                error,
        };
}
