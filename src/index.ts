
import type { ZodTypeAny, ZodObject, ZodString } from "zod";
import TakanashiFetch from "./fetch";

type HttpMethod = "GET" | "PUT" | "POST" | "HEAD" | "PATCH" | "DELETE";
type TakanashiResponse = string | Buffer;

export type Context = {
    request: Request,
    text: ( response: string ) => string,
    html: ( response: string ) => string,
    json: ( response: Record<any,any> | any[] ) => string
}

type TakanashiHooks = {
    body?: ZodString | ZodObject<{ [ key: string ]: ZodTypeAny }>
    beforeHandler?: () => any
}

type TakanashiStorage = {
    method: HttpMethod,
    pathname: string,
    handler: ( context: Context ) => TakanashiResponse,
    hooks: TakanashiHooks
}[]

class Takanashi {

    private storage: TakanashiStorage = [];

    public fetch = TakanashiFetch;

    get( pathname: `/${string}`, handler: ( context: Context ) => TakanashiResponse, hooks: Omit< TakanashiHooks,"body" > = {} ) {
        this.storage.push({ method: "GET", pathname, handler, hooks })
        return this
    }

}

export { Takanashi }
