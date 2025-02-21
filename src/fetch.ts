
import type { Server } from "bun";
import { Takanashi } from "./index";

export default async function TakanashiFetch( this: Takanashi, request: Request, server: Server ) {
    const link = new URL( request.url );
    return new Response( link.pathname );
}
