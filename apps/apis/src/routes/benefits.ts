import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";
import { benefitsTable } from "../db/schema";

const app = new Hono();

// GET All
app.get("/benefits", async (c) => {
  const benefits = await db.query.benefitsTable.findMany();
  return c.json(benefits, 200);
});

// GET One
app.get("/benefits/:code", async (c) => {
  const code = c.req.param("code");
  const benefit = await db.query.benefitsTable.findFirst({
    where: (benefitsTable, { eq }) => eq(benefitsTable.code, Number(code)),
  });
  return c.json(benefit, 200);
});

// CREATE benefit
app.post(
  "/benefits",
  zValidator(
    "json",
    z.object({
      // code: z.number(),
      benefit: z.string(),
      class: z.number(),
      require_lou: z.number(),
    }),
  ),
  async (c) => {
    const data = c.req.valid("json");

    const [benefit] = await db.insert(benefitsTable).values(data).returning();

    return c.json(
      {
        message: "Benefit created successfully!",
        data: benefit,
      },
      201,
    );
  },
);

// UPDATE benefit
app.patch(
  "/benefits/:code",
  zValidator(
    "json",
    z.object({
      benefit: z.string().optional(),
      class: z.number().optional(),
      require_lou: z.number().optional(),
    }),
  ),
  async (c) => {
    const code = c.req.param("code");
    const data = await c.req.valid("json");

    const [benefit] = await db
      .update(benefitsTable)
      .set(data)
      .where(eq(benefitsTable.code, Number(code)))
      .returning();

    return c.json(
      {
        message: "Benefit updated successfully!",
        data: benefit,
      },
      200,
    );
  },
);

// DELETE One
// eslint-disable-next-line drizzle/enforce-delete-with-where
app.delete("/benefits/:code", async (c) => {
  const code = c.req.param("code");

  const [benefit] = await db
    .delete(benefitsTable)
    .where(eq(benefitsTable.code, Number(code)))
    .returning();

  // eslint-disable-next-line no-console
  console.log(benefit);

  return c.body(null, 204);
});

export default app;
