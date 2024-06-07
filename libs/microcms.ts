import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSDate,
} from "microcms-js-sdk";

export type Blog = {
    id: string;
    title: string;
    content: string;
    eyecatch?: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
}); 

export const getList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Blog>({
        endpoint: "blogs",
        queries,
        // customRequestInit: { next: { revalidate: 1 } }, // fetch-cache を使用しない
        // customRequestInit: { cache: "no-store" }, // fetch-cache を使用しない
    });

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    return listData;
};

export const getDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Blog>({
        endpoint: "blogs",
        contentId,
        queries,
        // customRequestInit: { next: { revalidate: 1 } },
        // customRequestInit: { cache: "no-store" }, // fetch-cache を使用しない
    });

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    return detailData;
};