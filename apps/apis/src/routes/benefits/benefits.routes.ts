import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  insertBenefitsSchema,
  patchBenefitsSchema,
  selectBenefitsSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Benefits"];

export const list = createRoute({
  path: "/benefits",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectBenefitsSchema),
      "The list of benefits",
    ),
  },
});

export const create = createRoute({
  path: "/benefits",
  method: "post",
  request: {
    body: jsonContentRequired(insertBenefitsSchema, "The benefit to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectBenefitsSchema,
      "The created benefit",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertBenefitsSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/benefits/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectBenefitsSchema,
      "The requested benefit",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Benefit not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid (code) id error",
    ),
  },
});

export const patch = createRoute({
  path: "/benefits/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchBenefitsSchema, "The benefit updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectBenefitsSchema,
      "The updated benefit",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Benefit not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchBenefitsSchema).or(
        createErrorSchema(IdParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/benefits/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Benefit deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Benefit not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
