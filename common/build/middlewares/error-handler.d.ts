import { Response, Request, NextFunction } from "express";
export declare const errorHanler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
