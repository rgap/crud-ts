import type { Request, Response } from "express";

import { hash } from "../../crypto";
import { prisma, prismaError } from "../../db";
import { responseError, responseSuccess } from "../../network/responses";
import { handleResponseError } from "../../utils";

// READ

// _ = Not required
// Promise<Response> -> tipado deun async function
export async function list(_req: Request, res: Response): Promise<Response> {
  try {
    const users = await prisma.user.findMany();
    return responseSuccess({ res, data: users, status: 203 });
  } catch (error) {
    return handleResponseError(res, error);
    // const err = error as Prisma.PrismaClientKnownRequestError;
  }
}

// READ by id

export async function getById(req: Request, res: Response): Promise<Response> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      return responseError({ res, data: "User not found" });
    }

    return responseSuccess({ res, data: user });
  } catch (error) {
    return handleResponseError(res, error);
  }
}

// CREATE

export async function store(req: Request, res: Response): Promise<Response> {
  try {
    req.body.password = hash(req.body.password);

    await prisma.user.create({
      data: req.body,
    });

    return responseSuccess({ res, data: "User created", status: 201 });
  } catch (error) {
    return handleResponseError(res, error);
  }
}

// UPDATE

export async function update(req: Request, res: Response): Promise<Response> {
  try {
    if (req.body.password) {
      req.body.password = hash(req.body.password);
    }

    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    if (!user) {
      return responseError({ res, data: "User not found" });
    }

    return responseSuccess({ res, data: "User updated" });
  } catch (error) {
    return handleResponseError(res, error);
  }
}

// DELETE

export async function destroy(req: Request, res: Response): Promise<Response> {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return responseSuccess({ res, data: "User deleted" });
  } catch (error) {
    return handleResponseError(res, error);
  }
}
