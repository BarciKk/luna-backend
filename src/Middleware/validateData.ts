import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodType } from "zod";

export function validateData<T extends ZodType<any, any, any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(402)
          .json({ success: false, message: errorMessages[0].message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
