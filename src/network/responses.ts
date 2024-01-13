import { Response } from "express";

interface IResponse {
  res: Response;
  data: any;
  status?: number;
}

export function responseSuccess({
  res,
  data,
  status = 200,
}: IResponse): Response {
  return res.status(status).json({
    ok: true,
    data,
  });
}

export function responseError({
  res,
  data,
  status = 500,
}: IResponse): Response {
  return res.status(status).json({
    ok: false,
    data,
  });
}
