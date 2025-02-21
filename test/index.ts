
import { z } from "zod";
import { Takanashi } from "../src/index";

const app = new Takanashi();

app.get("/", (c) => c.text("haha"))

export default app;
