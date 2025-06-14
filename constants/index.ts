export * from './main-data'


export const BASE_URL_SERVER = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const IMG_BASE_URL = process.env.NEXT_PUBLIC_FILES_BASE_URL;


export function formatNumber(num: number): string {
    return num.toLocaleString("en-US").replace(/,/g, " ");
}

