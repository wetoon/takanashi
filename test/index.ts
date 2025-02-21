
import { z } from "zod";
import { Takanashi } from "../src/index";

const app = new Takanashi();

app.get("/:id/:m", (c) => {
    c.req.param("id")
    return c.text("haha")
})

export default app;
