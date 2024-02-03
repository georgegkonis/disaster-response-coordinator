import { NextFunction, Request, Response } from 'express';
import { createItemRequest, findItemRequests } from '../services/item-request.service';
import { CreateItemRequestInput } from '../schemas/item-request.schema';
import { StatusCode } from '../enums/status-code.enum';
import { ItemRequestStatus } from '../enums/request-status.enum';
import { getUser } from '../services/user.service';

export const createItemRequestHandler = async (
    req: Request<{}, {}, CreateItemRequestInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getUser(res.locals.user._id);

        req.body.citizen = user._id?.toHexString()!;
        req.body.coordinates = user.location!;

        const request = await createItemRequest(req.body);

        res.status(StatusCode.CREATED).json(request);
    } catch (error) {
        next(error);
    }
};

export const getMyItemRequestsHandler = async (
    req: Request<{}, {}, {}, { status?: ItemRequestStatus }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const citizen: string = res.locals.user._id;
        const requests = await findItemRequests({ citizen, ...req.query });

        res.status(StatusCode.OK).json(requests);
    } catch (error) {
        next(error);
    }
};

export const getItemRequestsHandler = async (
    req: Request<{}, {}, {}, { citizen?: string, status?: ItemRequestStatus }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const requests = await findItemRequests(req.query);

        res.status(StatusCode.OK).json(requests);
    } catch (error) {
        next(error);
    }
};

// TODO: implement request status update handlers