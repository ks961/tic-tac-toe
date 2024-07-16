import { useState, useEffect, useLayoutEffect } from 'react';

type ServerResponse<T> = {
    status: number;
    payload: T;
};

type TError = {
    error: string;
};

type FetchConfig = {
    requestOnExplicitTrigger?: boolean;
};


type UseFetchReturnType<T> = {
    data: T | null;
    error: TError | null;
    isLoading: boolean;
    token?: string,
    triggerFetch: <PayloadType>(data?: PayloadType) => Promise<T | undefined>;
};

export type ClientRequest<T> = {
    payload: T,
    token?: string,
}

export default function useFetch<T>(
    url: string | URL,
    requestConfig: RequestInit,
    token?: string,
    config?: FetchConfig,
): UseFetchReturnType<T> {

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<TError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [triggerFetchCallback, setTriggerFetchCallback] = useState<boolean>(false);

    // Trigger fetch on initial render unless explicitly configured otherwise
    useLayoutEffect(() => {
        if (!config?.requestOnExplicitTrigger) {
            setTriggerFetchCallback(true);
        }
    }, []);

    async function triggerFetch<PayloadType>(data?: PayloadType): Promise<T | undefined> {
        try {
            setIsLoading(true);

            const responseData: T = await reqFunc(data);

            setData(responseData);

            return responseData;

        } catch (err: unknown) {
            
            setError({ error: String(err) });

        } finally {
            setIsLoading(false);
        }
    }

    async function reqFunc<PayloadType>(payload?: PayloadType): Promise<T> {
        const payloadObj: any = {};

        payload && (payloadObj["payload"] = payload); 
        token && (payloadObj["token"] = token)

        const payloadObjHasKeys = Object.keys(payloadObj).length > 0;

        const config: RequestInit = {
            ...requestConfig,
            body: payloadObjHasKeys ? JSON.stringify(payloadObj) : undefined,
        };
        
        const resp = await fetch(url.toString(), config);
        
        const responseData: ServerResponse<T> = await resp.json();        

        if (responseData.status <= 199 || responseData.status >= 300) {            
            throw new Error(typeof responseData.payload === "string" ? responseData.payload : `Request failed with status ${responseData.status}`);
        }

        return responseData.payload;
    }

    useEffect(() => {
        if (triggerFetchCallback) {
            reqFunc().catch((err) => setError({ error: String(err) }));
        }
    }, [triggerFetchCallback]);

    return { data, error, isLoading, triggerFetch };
}