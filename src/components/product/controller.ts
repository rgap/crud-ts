import type { Request, Response } from "express";
import { IBody } from "../../core/types";
import { prisma, prismaError } from "../../db";
import { responseError, responseSuccess } from "../../network/responses";
import { handleResponseError } from "../../utils";
import { mapInsertProduct } from "./utils";

// READ

export async function list(_req: Request, res: Response): Promise<Response> {
  try {
    const products = await prisma.product.findMany();
    return responseSuccess({ res, data: products, status: 203 });
  } catch (error) {
    return handleResponseError(res, error);
  }
}

// READ by id

export async function getById(req: Request, res: Response): Promise<Response> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      return responseError({ res, data: "Product not found" });
    }

    return responseSuccess({ res, data: product });
  } catch (error) {
    return handleResponseError(res, error);
  }
}

// CREATE

export async function store(req: Request, res: Response): Promise<Response> {
  try {
    const { ok, data } = mapInsertProduct(req.body as IBody);

    if (!ok) {
      return responseError({ res, data });
    }

    const newProduct = await prisma.product.create({ data });

    return responseSuccess({ res, data: newProduct, status: 201 });
  } catch (error) {
    return handleResponseError(res, error);
  }
}
