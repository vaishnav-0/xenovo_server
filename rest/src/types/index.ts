import { Request, Response, NextFunction } from 'express';

export type ExpressMiddlewareFNType<reqBody = {}, resBody = {}> = (req: Request & reqBody, res: Response & resBody, N: NextFunction) => void;