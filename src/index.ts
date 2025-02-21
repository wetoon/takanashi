
import { z } from "zod";
import type { ZodTypeAny, ZodObject, ZodString } from "zod";
import TakanashiFetch from "./fetch";

type ExtractParams< Path extends string > = Path extends `${string}:${infer ParamName}/${infer Rest}` ? ParamName | ExtractParams<Rest> : Path extends `${string}:${infer ParamName}` ? ParamName : never;
type HttpMethod = "GET" | "PUT" | "POST" | "HEAD" | "PATCH" | "DELETE";
type TakanashiResponse = string | Buffer;

export type Context< PathName extends string = "" > = {
    req: {
        param: ( name: ExtractParams<PathName> ) => string,
        query: ( name: string ) => string | undefined
    },
    text: ( response: string ) => string,
    html: ( response: string ) => string,
    json: ( response: Record<any,any> | any[] ) => string
}

type TakanashiHooks = {
    body?: ZodString | ZodObject<{ [ key: string ]: ZodTypeAny }>
    content?: "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded",
    beforeHandler?: () => any
}

type TakanashiStorage = {
    method: HttpMethod,
    pathname: string,
    handler: ( context: Context<any> ) => TakanashiResponse,
    hooks: TakanashiHooks
}[]

class Takanashi {

    private storage: TakanashiStorage = [];

    public fetch = TakanashiFetch;

    get< PathName extends `/${string}` >( pathname: PathName, handler: ( context: Context< PathName > ) => TakanashiResponse, hooks: Omit< TakanashiHooks,"body" > = {} ) {
        this.storage.push({ method: "GET", pathname, handler, hooks })
        return this
    }

}

export { Takanashi, z as zod }
