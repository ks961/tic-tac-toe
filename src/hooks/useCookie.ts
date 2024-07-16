import { fromHourToMillisec } from "@/utils";
import { useState } from "react";

export type Cookie = {
    [key: string]: string,
}

export type CookieConfig = {
    maxAge?: number;
    signed?: boolean;
    expires?: Date;
    httpOnly?: boolean;
    path?: string;
    domain?: string;
    secure?: boolean;
    encode?: ((val: string) => string);
    sameSite?: boolean | "lax" | "strict" | "none";
    priority?: "low" | "medium" | "high";
    partitioned?: boolean;
}

export function loadCookies(): Cookie[] {
    const cookies = document.cookie.split("; ");
    
    const cookiesObjs = cookies.map(cookie => {
        const [ key, value ] = cookie.split("=");
        return {
            [key]: value
        }
    });

    return cookiesObjs;
}

export function loadCookiesByKey(key: string): Cookie {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    
    const cookie = cookies.reduce((acc: any, cookie: string) => {
        if(acc) return;

        const [ckey, value] = cookie.split("=");
        
        if(ckey === key) return { [ckey]: value };
        
        return acc;
    }, {});

    return cookie;
}

export type HCookieReturnType = { 
    cookie: Cookie | Cookie[],
    setCookie: (cookie: string) => void;
    setCookieNewCookie: (newKey: string, newValue: string) => void;
}

export default function useCookie(key?: string): HCookieReturnType {
    const [ cookie, setCookieValue ] = useState<Cookie[] | Cookie>(() => key ? loadCookiesByKey(key) : loadCookies());

    function setCookieNewCookie(newKey: string, newValue: string) {
        const oneHour = fromHourToMillisec(1);
        const cookieString = `${newKey}=${newValue}; path=/; Max-Age=${oneHour}; SameSite=strict; Priority=High;`;

        document.cookie = cookieString;

        if(Array.isArray(cookie)) {

            setCookieValue(prevCookie => ({
                ...prevCookie,
                [newKey]: newValue,
            }));

            return;
        }
        
        setCookieValue({
            [newKey]: newValue
        });
    }
    
    function setCookie(cookie: string) {
        const [ key, value ] = cookie.split("; ")[0].split("=");
        
        document.cookie = cookie;
        
        setCookieValue(prevCookie => ({
            ...prevCookie,
            [key]: value,
        }));
    }

    return { cookie, setCookie, setCookieNewCookie };
}