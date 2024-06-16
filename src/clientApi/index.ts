import axios, { AxiosResponse } from "axios";

// Inicializacion de un cliente de axios personalizado

export const AFClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
    timeout: 15000,
    timeoutErrorMessage: "Request timed out",
});

const responseBody = (response: AxiosResponse) => response.data;

const addContentTypeHeader = (contentType: string) => {
    AFClient.defaults.headers.common["Content-Type"] = contentType;
};

const removeContentTypeHeader = () => {
    delete AFClient.defaults.headers.common["Content-Type"];
};

export const requests = {
    async request(
        method: "get" | "post" | "put" | "delete" | "patch",
        url: string,
        body?: any,
        contentType?: string,
    ) {

        if (contentType) {
            addContentTypeHeader(contentType);
        } else {
            removeContentTypeHeader();
        }

        try {
            const response = await AFClient[method](url, body);
            return responseBody(response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unknown error:', error);
            }
            throw error;
        }
    },

    get: (url: string, body?: any) => requests.request("get", url, body),
    post: (url: string, body?: any, contentType?: string) => requests.request("post", url, body, contentType),
    put: (url: string, body?: any, contentType?: string) => requests.request("put", url, body, contentType),
    delete: (url: string, body?: any) => requests.request("delete", url, body),
    patch: (url: string, body?: any, contentType?: string) => requests.request("patch", url, body, contentType),
};
