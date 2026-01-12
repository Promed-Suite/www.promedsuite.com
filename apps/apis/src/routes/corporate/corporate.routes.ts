import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import {
  insertCorporateSchema,
  patchCorporateSchema,
  selectCorporateSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Corporate"];

export const list = createRoute({
  path: "/corporate",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCorporateSchema),
      "The list of corporate",
    ),
  },
});

export const create = createRoute({
  path: "/corporate",
  method: "post",
  request: {
    body: jsonContentRequired(insertCorporateSchema, "The corporate to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectCorporateSchema,
      "The created corporate",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertCorporateSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/corporate/{id}",
  method: "get",
  request: {
    params: IdUUIDParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCorporateSchema,
      "The requested corporate",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Corporate not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid (code) id error",
    ),
  },
});

export const patch = createRoute({
  path: "/corporate/{id}",
  method: "patch",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(patchCorporateSchema, "The corporate updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCorporateSchema,
      "The updated corporate",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Corporate not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchCorporateSchema).or(
        createErrorSchema(IdUUIDParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/corporate/{id}",
  method: "delete",
  request: {
    params: IdUUIDParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Corporate deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Corporate not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
